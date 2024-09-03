import { 
    Flex,
    Image,
    Heading,
    Button

} from "@chakra-ui/react";
import PageNotFound from "../assets/PageNotFound.svg";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

const NotFound = () => {
    const navigate = useNavigate();

    return (  
        <Flex
            width="100%"
            height="100%"
            alignItems="center"
            justify="center"
            direction="column"
            gap="1rem"
        >
            <Helmet>
                <title>404 Not Found | Grouped</title>
                <meta name="description" content="Oops! The page you're looking for cannot be found. It may have been moved or deleted. Return to the home page to continue exploring Grouped." />
                <meta name="keywords" content="404, not found, error page, Grouped, page not found" />
                <meta property="og:title" content="404 Not Found | Grouped" />
                <meta property="og:description" content="Oops! We can't find the page you're looking for. Return to the home page or navigate to other parts of Grouped." />
                <meta property="og:type" content="website" />
            </Helmet>

            <Image src={PageNotFound} alt="Page Not Found svg" boxSize="xs"/>
            <Heading size="lg">Uh-oh! We can’t find the page you’re looking for.</Heading>
            <Flex
                gap="1rem"
                mb="1rem"
            >
                <Button

                >Back</Button>
                <Button 
                    colorScheme="purple"
                    onClick={() => navigate("/")}
                >Home</Button>
            </Flex>

        </Flex>
    );
}
 
export default NotFound;