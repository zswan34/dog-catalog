import { SetStateAction, useEffect, useState } from "react";
import { Flex, Grid, Text, TextField, View } from "@adobe/react-spectrum";
import CatalogCard from "./CatalogCard";
import {isEmpty} from 'lodash';
import Fuse from "fuse.js";

const Catalog = () => {

    const [data, setData] = useState<any[]>([])
    const [text, setText] = useState<string>("");
    const [searchData, setSearchData] = useState<any[]>([]);

    useEffect(() => {
        const fetchBreeds =async () => {
          const response = await fetch('https://api.thedogapi.com/v1/breeds/');
          const data = await response.json();
          setData(data);
          setSearchData(data);
        }
  
        fetchBreeds();
    }, []);


    const handleSearch = (e: SetStateAction<string>) => {
        setText(e);
        const options = {
            keys: [
                'name'
            ]
        };
        const fuse = new Fuse(data, options);
        const searchResults = fuse.search(e.toString());
        const tmpResults: any[] = [];

        searchResults.map((result) => {
            tmpResults.push(result.item);
        });
        setSearchData(isEmpty(e) ? data : tmpResults);
    }

    return (
        <Grid
            areas={[
            'header',
            'content'
            ]}
            columns={['1fr']}
            rows={['size-2000', 'auto']}
            minHeight="100vh"
            justifyContent="center"
            gap="size-100">
                <View gridArea="header">
                    <Flex height={'100%'} direction={'row'} justifyContent='center' alignItems={'center'}>
                            <TextField aria-label="Search" value={text} onChange={handleSearch} placeholder="Search Breeds" />
                    </Flex>
                </View>
                <View 
                    gridArea="content"
                    padding="size-100"
                    >
                        {isEmpty(data) ? (
                            <Flex direction={'row'} justifyContent='center' alignContent={'center'}>
                                <View>
                                    <Text>
                                        <h1>Loading...</h1>
                                        </Text>
                                </View>
                            </Flex>
                        ) : (
                            <>
                                {isEmpty(searchData) ?
                                (
                                    <Flex direction={'row'} justifyContent='center' alignContent={'center'}>
                                        <View>
                                            <Text><h1>No Results</h1></Text>
                                        </View>
                                    </Flex>
                                ) : (
                                <Flex direction={'row'} gap="size-500" wrap justifyContent="center">
                                    {searchData.map((card, idx) => (
                                        <CatalogCard key={idx} card={card} />
                                    ))}
                                </Flex>
                                )}
                            </>
                        )}
            </View>
        </Grid>
    )
}


export default Catalog;