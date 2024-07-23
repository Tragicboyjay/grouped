import { 
    Flex,
    Image,
    Heading,
    Button

} from "@chakra-ui/react";
import PageNotFound from "../assets/PageNotFound.svg";
import { useNavigate } from "react-router-dom";

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
            <Image src={PageNotFound} alt="Page Not Found svg" boxSize="xs" />
            <Heading size="lg">Uh-oh! We can’t find the page you’re looking for.</Heading>
            <Flex
                gap="1rem"
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