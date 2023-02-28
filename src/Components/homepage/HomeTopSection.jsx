import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GoTriangleDown } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import ServicesCategory from "../ServicesCategory";
import styles from "../../StyleComponents/Home.module.css";
import { useThrottle } from "use-throttle";
import { useNavigate } from "react-router-dom";
import ImageSlider from '../ImageSlider'
import {SliderData} from "../SliderData";
import '../App.css';
import Banner from '../Banner'

const cardData = [
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtj8JFzRj4-XNywwDqEic5im8rEf-2WkFdUw&usqp=CAU",
    service: "Hair Cut",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gC0446hShdQJ67ETrhqoJJC9qDHSkcL-oA&usqp=CAU",
    service: "Massage",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81qULmMwewYiyJNsyRCPmK7lVgjOKBraJ0w&usqp=CAU",
    service: "Waxing",
  },
  {
    logo: "data:image/jpeg;base64,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",
    service: "Nails",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjP_c_ntfVkSL_fx_mlpvJeCLyr7YSDWsfqiw_ed2QFduPVLtL-xBOduLSLKAAdM4qDM&usqp=CAU",
    service: "Tattoos",
  },
];

const HomeTopSection = ({ loading, setLoading, onChange, suggestions }) => {
  const selectedCity = localStorage.getItem("location");
  const [inputText, setInputText] = useState("");
  const [active, setActive] = useState(0);
  const scrollRef = useRef();
  const throttledText = useThrottle(inputText, 1000);
  const navigate=useNavigate()
  useEffect(() => {
    onChange(throttledText);
  }, [throttledText, onChange]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setLoading(true);
  };

  // const handleClear = () => {
  //   setInputText("");
  //   onChange("");
  //   setLoading(false);
  // };
  
  const searchResult = (item) => {
    navigate(`/:city/${item}/services`)
  };

  return (
    <Box>
      <Box className={styles.homeTopBox}>
        <ImageSlider slides={SliderData} />
        <Container color="whitesmoke" fontSize={"12px"}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{selectedCity}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
        <Heading
          as={"h1"}
          fontSize="48px"
          fontWeight="500"
          color="white"
          lineHeight={"72px"}
        >
          MYNTRA SALON

        </Heading>
        <br />
        <br />
        <Container
          maxW="3xl"
          lineHeight={"24px"}
          h="300px"
          mt="20%"
          position="absolute"
        >
          <Flex h="60px" justifyContent={"space-between"}>
            <Flex
              alignItems={"center"}
              bgColor={"whitesmoke"}
              borderRadius="5px"
              w="25%"
            >
              <Image
                w="35px"
                src="https://images.urbanclap.com/image/upload//q_auto,f_auto,fl_progressive:steep/t_medium_res_template/v1514444369/Flag_of_India_28Dec2017-1.png"
                alt="flag"
                m="5%"
              />
              <Text>{selectedCity}</Text>
              <Popover isLazy>
                <PopoverTrigger>
                  <Button bg="whitesmoke">
                    <GoTriangleDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent mt="3%" w="50vh" h="150px">
                  <PopoverHeader fontWeight="semibold">
                    <Flex
                      justifyContent={"space-between"}
                      alignItems="center"
                      w="90%"
                    >
                      <GrLocation mt="-2%" />
                      <Text>Current Location</Text>
                      <Text color="purple.600">detect using gps </Text>
                    </Flex>
                  </PopoverHeader>
                  <PopoverArrow ml="-8rem" />
                  <PopoverCloseButton />
                  <PopoverBody mt="3%" h="40%">
                    <Flex w="100%" h="100%">
                      <Button
                        className={styles.popOverButton}
                        bg="white"
                        borderRadius={"5px 0 0 5px"}
                      >
                        <AiOutlineSearch />
                      </Button>
                      <Input
                        className={styles.popOverInput}
                        autoFocus
                        focusBorderColor="none"
                        placeholder="Search for Society/ Appartment.."
                      />
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
            <Flex w="70%" h="100%" len={suggestions.length}>
              <Button
                borderRadius={"5px 0 0 5px"}
                h="100%"
                bg="whitesmoke"
                fontSize={"30px"}
                pb="5%"
              >
                <AiOutlineSearch />
              </Button>
              <Input
                value={inputText}
                onChange={handleInputChange}
                w="100%"
                borderRadius={"0 5px 5px 0"}
                h="100%"
                bg="whitesmoke"
                focusBorderColor="none"
                placeholder="Search for services"
              />
            </Flex>
          </Flex>
          {/* search result box */}
          {suggestions.length > 0 && (
            <Box
              className={styles.searchResultBox}
              len={suggestions.length}
              limit={5}
              active={active}
              ref={scrollRef}
            >
              {suggestions.map((item, index) => {
                return (
                  <Box
                    key={index}
                    _hover={{ bgColor: "purple.100" }}
                    className={styles.suggestions}
                    onClick={() => {
                      searchResult(index);
                    }}
                  >
                    {item}
                  </Box>
                );
              })}
            </Box>
          )}
        </Container>

        <br />
        <Container color="white" marginLeft="37%">
          <Breadcrumb separator=",">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Women's Therapies</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Salon for Men</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Men's Therapies</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </Box>
      <ServicesCategory data={cardData} />
    </Box>
  );
};

export default HomeTopSection;
