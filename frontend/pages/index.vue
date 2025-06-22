<script setup>

const BASE_URL = 'http://localhost:8080';

const { data: books } = await useFetch(`${BASE_URL}/books`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

</script>

<template>
    <div>
        hello book
        <ul>
            <div v-for="book in books" :key="book.id">
                <strong>
                    {{ book.title }}
                </strong>
                by {{ book.author }}

                <p>
                    <strong>Published:</strong> {{ book.published_year }}<br>
                    <strong>Updated At:</strong> {{ book.updated_at }}<br>
                    <strong>Created At:</strong> {{ book.created_at }}
                </p>
            </div>
        </ul>
    </div>
</template>
