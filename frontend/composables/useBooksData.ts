
export default function () {
  const { data } = useNuxtData('books')



  return {
    books: data,
  }
}