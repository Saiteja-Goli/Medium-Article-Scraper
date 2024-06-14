import React from 'react';
import { Box, Link, Text, Grid, Button } from '@chakra-ui/react';

const ArticleList = ({ articles }) => {
    return (
        <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={6}
            mt={8}
        >
            {articles.map((article, index) => (
                <Box key={index} p={5} shadow="base" borderWidth="1px" borderRadius="lg" position="relative">
                    <Text fontSize="xl" fontWeight="bold" mb={2}>{article.title}</Text>
                    <Text mb={2} mt={2}>By: {article.author || 'Unknown Author'}</Text>
                    <Text mb={2}>Published: {article.pubDate}</Text>
                    <Link href={article.url} isExternal color="teal.500">
                        <Button position="absolute" bottom={2} right={2}>
                            View
                        </Button>
                    </Link>
                </Box>
            ))}
        </Grid>
    );
};

export default ArticleList;
