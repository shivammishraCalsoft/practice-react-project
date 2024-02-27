import { Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import filter from './img/filter-solid.svg'

type User = {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    },
    "phone": string,
    "website": string,
    "company": {
        "name": string,
        "catchPhrase": string,
        "bs": string
    }
}

const Home: React.FC = () => {
    const [data, setData] = useState<User[]>([])
    const [error, setError] = useState<string>()
    const headerData = ['name', 'username', 'email', 'website', 'company']
    const [filteredData, setFilteredData] = useState<User[]>([])
    const [filterColumn, setFilterColumn] = useState(0)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!res.ok) {
                    throw Error('data fetching error')
                }
                const data = await res.json()
                setData(data)
                setFilteredData(data)
            } catch {
                setError('data fetching error')
            }
        }
        dataFetch()
    }, [])

    const searchFunc = (searchVal: string) => {
        let filteredDataVal: User[]
        if (filterColumn === 1) {
            filteredDataVal = data.filter((entity) => entity.name.toLowerCase().startsWith(searchVal))
        } else if (filterColumn === 2) {
            filteredDataVal = data.filter((entity) => entity.username.toLowerCase().startsWith(searchVal))
        } else if (filterColumn === 3) {
            filteredDataVal = data.filter((entity) => entity.email.toLowerCase().startsWith(searchVal))
        } else if (filterColumn === 4) {
            filteredDataVal = data.filter((entity) => entity.website.toLowerCase().startsWith(searchVal))
        }
        else {
            filteredDataVal = data.filter((entity) => entity.company.name.toLowerCase().startsWith(searchVal))
        }
        setFilteredData(filteredDataVal)
    }

    useEffect(() => {
        if (search.length > 0 && filterColumn !== -1) {
            searchFunc(search)
        }
    }, [search, filterColumn])

    const filterClicked = (column: number) => {
        if (filterColumn === column) {
            setFilterColumn(-1)
        } else {
            if (filterColumn !== -1) {
                setSearch('')
                setFilteredData(data)
            }
            setFilterColumn(column)
        }
    }

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        if (e.target.value.length === 0) {
            setFilteredData(data)
        }
    }

    return (
        <TableContainer>
            {
                error ?
                    <div className="text-center">{error}</div>
                    :
                    <>
                        {
                            data.length > 0 &&
                            <Flex justify='center'>
                                <Table variant='striped' colorScheme='teal' width='80%'>
                                    <TableCaption data-test="usersTableCaption">Users Table with filter facility</TableCaption>
                                    <Thead>
                                        <Tr>
                                            {
                                                headerData.map((heading, index) => {
                                                    return (
                                                        <Th key={index}><Flex ><Text marginRight='15px'>{heading.toUpperCase()}</Text><img src={filter} alt="filter" height='10px' width='10px' className="pointer" onClick={() => filterClicked(index + 1)} /></Flex>
                                                            {
                                                                filterColumn === index + 1 &&
                                                                <Input value={search} variant='filled' type="text" placeholder="search..." size='sm' marginTop='10px' onChange={onChangeSearch} />
                                                            }
                                                        </Th>
                                                    )
                                                })
                                            }
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            filteredData.length > 0 ?
                                                filteredData.map((users, index) => {
                                                    return (
                                                        <Tr key={index}>
                                                            <Td>{users.name}</Td>
                                                            <Td>{users.username}</Td>
                                                            <Td>{users.email}</Td>
                                                            <Td>{users.website}</Td>
                                                            <Td>{users.company.name}</Td>
                                                        </Tr>
                                                    )
                                                })
                                                :
                                                <Text>No Matching Result Found!</Text>
                                        }
                                    </Tbody>
                                </Table>
                            </Flex>
                        }
                    </>
            }
        </TableContainer>
    )
}

export default Home