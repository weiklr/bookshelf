import {useQuery, queryCache} from 'react-query'
import {client} from 'utils/api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

const getBookSearchConfig = (query, user) => {
  return {
    queryKey: ['bookSearch', {query}],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
    config: {
      onSuccess(books) {
        for (const book of books) {
          setQueryDataForBook(book)
        }
      },
    },
  }
}

const useBookSearch = (query, user) => {
  const result = useQuery(getBookSearchConfig(query, user))
  return {...result, books: result.data ?? loadingBooks}
}

const useBook = (bookId, user) => {
  const result = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })

  return {...result, book: result.data ?? loadingBook}
}

const refetchBookSearchQuery = user => {
  queryCache.removeQueries('bookSearch')
  queryCache.prefetchQuery(getBookSearchConfig('', user))
}

const setQueryDataForBook = book => {
  queryCache.setQueryData(['book', {bookId: book.id}], book)
}

export {useBookSearch, useBook, refetchBookSearchQuery, setQueryDataForBook}
