import Link from 'next/link';
import Image from 'next/image';
import {Flex, Box, Text, Button} from '@chakra-ui/react';

import Property from '../components/Property.jsx';
import { baseUrl, fetchApi } from '../utils/fetchApi.js';

export default function Home({propertiesForSale, propertiesForRent}) {

  console.log(propertiesForSale, propertiesForRent);

  const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl}) => (
    <Flex flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} m={"10"}  >
      <Image src={imageUrl} width={500} height={300} alt="banner" ></Image>
      <Box>
        <Text color={"gray.500"} fontSize="sm" fontWeight="medium" marginLeft='3'>{purpose}</Text>
        <Text fontSize="3x1" fontWeight="bold" marginLeft='3'>{title1}<br />{title2}</Text>
        <Text color={"gray.700"} fontSize="lg" paddingTop="3" paddingBottom="3" marginLeft='3'>{desc1}<br />{desc2}</Text>
        <Button fontSize="xl" marginLeft='3'>
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  )

  return (
    <div>
      <Banner 
      purpose={"For rent"}
      title1="Rental Homes for"
      title2="Everyone"
      desc1="Explore apartments, villas, homes"
      desc2="and more"
      buttonText="Explore Renting"
      linkName="/search?purpose=for-rent"
      imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner
      purpose={"For buy"}
      title1="Find and buy your"
      title2="Dream home"
      desc1="Explore apartments, villas, homes"
      desc2="and more"
      buttonText="Explore Renting"
      linkName="/search?purpose=for-sale"
      imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4" 
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </div>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}
