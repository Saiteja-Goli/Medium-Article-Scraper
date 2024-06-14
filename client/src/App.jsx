import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Spinner, useToast, Center, Text } from '@chakra-ui/react';
import TopicForm from './components/TopicForm';
import ArticleList from './components/ArticleList';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [articlesNotFound, setArticlesNotFound] = useState(false);
    const toast = useToast();

    const fetchArticles = async (topic) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch articles.');
            }

            const data = await response.json();

            if (data.articles.length === 0) {
                setArticles([]);
                setArticlesNotFound(true);
            }else {
                setArticles(data.articles);
                setArticlesNotFound(false);
                toast({
                    title: "Articles fetched successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error fetching articles.",
                description: "Something Went Wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box className="App" >
                <Box bg="black" color="white" px={5} py={3}>
                    <Center>
                        <Heading as="h1" size="lg" padding={2}fontFamily={"sans-serif"}>Medium Article Scraper</Heading>
                    </Center>
                </Box>
                <TopicForm onSubmit={fetchArticles} />
                {loading ? (
                    <Center mt={250}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Center>
                ) : (
                    <Box pl={10} pr={10}>
                        {articlesNotFound ? (
                            <Center mt={250}>
                                <Text fontSize="xl" mt={5}>No articles found for the entered topic.</Text>
                            </Center>
                        ) : (
                            <ArticleList articles={articles} />
                        )}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default App;
