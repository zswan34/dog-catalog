import { Grid, View, Flex, Text, Image, IllustratedMessage, Heading } from "@adobe/react-spectrum";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CatalogCompare = () => {
    const params = useParams<any>();
    const [breedOne, setBreedOne] = useState<any>({});
    const [breedTwo, setBreedTwo] = useState<any>({});
    const [imageSrcOne, setImageSrcOne] = useState<string>('');
    const [imageSrcTwo, setImageSrcTwo] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchBreedOneData = async () => {
            try {
                let response = await fetch(`https://api.thedogapi.com/v1/breeds/${params.breedOne}`);
                const data = await response.json();
                response = await fetch(`https://api.thedogapi.com/v1/images/${data.reference_image_id}`)
                const imageSrc = await response.json();
                setBreedOne(data);
                setImageSrcOne(imageSrc.url);
            } catch(err) {
                setError(true)
            }
        }

        fetchBreedOneData();
        const fetchBreedTwoData = async () => {
            try {
                let response = await fetch(`https://api.thedogapi.com/v1/breeds/${params.breedTwo}`);
                const data = await response.json();
                response = await fetch(`https://api.thedogapi.com/v1/images/${data.reference_image_id}`)
                const imageSrc = await response.json();
                setBreedTwo(data);
                setImageSrcTwo(imageSrc.url);
            } catch(err) {
                setError(true)
            }
        }

        fetchBreedTwoData();
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
                {(isEmpty(breedOne) || isEmpty(breedTwo)) ? (
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
                    <Flex direction={'row'} justifyContent={'space-between'} alignItems='center' wrap gap="size-1000">
                        <View>
                            <Flex direction={'row'} alignContent={'center'} justifyContent='center' wrap gap="size-500">
                                <View>
                                    <Image UNSAFE_className={'breed-image'} maxWidth={'400px'} src={imageSrcOne} alt={breedOne.name} />
                                </View>
                                <View flexGrow={1}>
                                    <Flex direction={'column'} gap="size=200">
                                        <View>
                                            <Text>
                                                <h1>{breedOne.name}</h1>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Life Span:</strong> {breedOne.life_span}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Bred For:</strong> {breedOne.bred_for}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Height:</strong> {breedOne.height.imperial} inches
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Weight:</strong> {breedOne.weight.imperial} pounds
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Temperament:</strong> {breedOne.temperament}
                                            </Text>
                                        </View>
                                    </Flex>
                                </View>
                            </Flex>
                        </View>
                        <View>
                            <Flex direction={'row'} alignContent={'center'} justifyContent='center' wrap gap="size-500">
                                <View>
                                    <Image UNSAFE_className={'breed-image'} maxWidth={'400px'} src={imageSrcTwo} alt={breedTwo.name} />
                                </View>
                                <View flexGrow={1}>
                                    <Flex direction={'column'} gap="size=200" wrap>
                                        <View>
                                            <Text>
                                                <h1>{breedTwo.name}</h1>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Life Span:</strong> {breedTwo.life_span}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Bred For:</strong> {breedTwo.bred_for}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Height:</strong> {breedTwo.height.imperial} inches
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Weight:</strong> {breedTwo.weight.imperial} pounds
                                            </Text>
                                        </View>
                                        <View>
                                            <Text>
                                                <strong>Temperament:</strong> {breedTwo.temperament}
                                            </Text>
                                        </View>
                                    </Flex>
                                </View>
                            </Flex>
                        </View>
                    </Flex>
                )}
            </View>
        </Grid>
    )
}

export default CatalogCompare;