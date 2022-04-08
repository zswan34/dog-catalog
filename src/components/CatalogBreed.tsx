import { Flex, Grid, Text, View, Image, IllustratedMessage, Heading } from "@adobe/react-spectrum";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CatalogBreed = () => {
    const params = useParams<any>();
    const [data, setData] = useState<any>({})
    const [imageSrc, setImageSrc] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchBreedData =async () => {
            try {
                let response = await fetch(`https://api.thedogapi.com/v1/breeds/${params.breedId}`);
                const data = await response.json();
                response = await fetch(`https://api.thedogapi.com/v1/images/${data.reference_image_id}`)
                const imageSrc = await response.json();
                setData(data);
                setImageSrc(imageSrc.url);
            } catch(err) {
                setError(true)
            }
        }

        fetchBreedData();
    }, [params]);

    return (
        <Grid
            areas={[
            'header',
            'content'
            ]}
            columns={['1fr']}
            rows={['size-1000', 'auto']}
            minHeight="100vh"
            justifyContent="center"
            gap="size-100">
                <View paddingX={'size-500'} gridArea={'header'}>
                    <Flex direction={'column'}>
                        <View>
                            <Link to={'/'} className={'back'}>
                                <Text>
                                    <h3>Back</h3>
                                </Text>
                            </Link>
                        </View>
                    </Flex>
                </View>
                <View paddingX="size-500" gridArea={'content'}>
                    {isEmpty(data) ? (
                        <>
                            {error ? (
                                <Flex direction={'row'} justifyContent='center' alignContent={'center'}>
                                    <View>
                                        <IllustratedMessage>
                                            <Heading>Loading...</Heading>
                                        </IllustratedMessage>
                                    </View>
                                </Flex>
                            ) : (
                                <Flex direction={'row'} justifyContent='center' alignContent={'center'}>
                                    <View>
                                        <IllustratedMessage>
                                            <Heading>Failed to load data.</Heading>
                                        </IllustratedMessage>
                                    </View>
                                </Flex>
                            )}
                        </>

                    ) : (
                        <Flex direction={'row'} alignContent={'center'} justifyContent='center' wrap gap="size-500">
                            <View>
                                <Image UNSAFE_className={'breed-image'} maxWidth={'400px'} src={imageSrc} alt={data.name} />
                            </View>
                            <View flexGrow={1}>
                                <Flex direction={'column'} gap="size=200">
                                    <View>
                                        <Text>
                                            <h1>{data.name}</h1>
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            <strong>Life Span:</strong> {data.life_span}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            <strong>Bred For:</strong> {data.bred_for}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            <strong>Height:</strong> {data.height.imperial} inches
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            <strong>Weight:</strong> {data.weight.imperial} pounds
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>
                                            <strong>Temperament:</strong> {data.temperament}
                                        </Text>
                                    </View>
                                </Flex>
                            </View>
                        </Flex>
                    )}
                </View>
            </Grid>
    )
}

export default CatalogBreed;