import React, { useState } from 'react';
import { Input, Button, Stack } from '@chakra-ui/react';

const TopicForm = ({ onSubmit }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(topic);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4} direction="row" align="center" justify="center" mt={4}>
                <Input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic"
                    size="md"
                    width="300px"
                    required
                />
                <Button type="submit" colorScheme="whatsapp" size="md">
                    Scrape
                </Button>
            </Stack>
        </form>
    );
};

export default TopicForm;
