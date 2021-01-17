import {useQuery} from 'react-query'
import {client} from 'utils/api-client'

const useListItems = user => {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })
  return listItems ?? []
}

const useListItem = (user, bookId) => {
  const listItems = useListItems(user)
  const listItem = listItems.find(item => item.bookId === bookId)

  return listItem ?? null
}

export {useListItems, useListItem}
