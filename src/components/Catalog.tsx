import { Content, Divider, Flex, Grid, Heading, IllustratedMessage, SearchField, Text, View } from "@adobe/react-spectrum";
import CatalogCard from "./CatalogCard";
import {isEmpty} from 'lodash';
import Fuse from "fuse.js";
import CatalogCompareFields from "./CatalogComapreFields";
import { SetStateAction, useEffect, useState } from "react";

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
            rows={['auto', 'auto']}
            minHeight="100vh"
            justifyContent="center"
            gap="size-100">
                <View gridArea="header">
                    <Flex direction={'column'} marginTop="size-10" marginBottom={"size-500"} justifyContent='center' alignItems='center' height={'100%'} wrap gap="size-200">
                        <View>
                            <Flex direction={'column'} alignItems={'center'}>
                                <View>
                                    <SearchField minWidth={300} aria-label="Search" value={text} onChange={handleSearch} placeholder="Search Breeds" />
                                </View>
                                <View>
                                    <Text>
                                        <h4>Dog Breeds: {searchData.length}</h4>
                                    </Text>
                                </View>
                            </Flex>
                        </View>
                        <Divider height={'size-10'} />
                        <View>
                            <CatalogCompareFields data={data} />
                        </View>
                        <Divider height={'size-10'} />
                    </Flex>
                </View>
                <View 
                    gridArea="content"
                    padding="size-100"
                    >
                        {isEmpty(data) ? (
                            <Flex direction={'row'} justifyContent='center' alignContent={'center'}>
                                <View>
                                    <IllustratedMessage>
                                        <Heading>Loading...</Heading>
                                    </IllustratedMessage>
                                </View>
                            </Flex>
                        ) : (
                            <>
                                {isEmpty(searchData) ?
                                (
                                    <Flex direction={'row'} justifyContent='center' alignContent={'center'}>
                                        <View>
                                            <IllustratedMessage>
                                                <Heading>No results</Heading>
                                                <Content>Try another search</Content>
                                            </IllustratedMessage>
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