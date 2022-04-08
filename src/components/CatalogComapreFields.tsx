import { Flex, Item, View, Picker, Button } from "@adobe/react-spectrum";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router";

type CatalogCompareFieldsProps = {
    data: any,
}

const CatalogCompareFields = ({data}: CatalogCompareFieldsProps) => {
    const navigate = useNavigate();
    const [collectionOne, setCollectionOne] = useState<any>({});
    const [collectionTwo, setCollectionTwo] = useState<any>({});
    
    return (
        <Flex direction={'row'} justifyContent='center' alignItems={"end"} wrap gap={'size-500'}>
            <View>
                <Picker
                    isDisabled={isEmpty(data)}
                    label="Select the first breed"
                    items={data}
                    onSelectionChange={setCollectionOne}
                  >
                    {(item: any) => <Item key={item.id}>{item.name}</Item>}
                </Picker>
            </View>
            <View>
                <Picker
                    isDisabled={isEmpty(data)}
                    label="Select the second breed"
                    items={data}
                    onSelectionChange={setCollectionTwo}
                >
                    {(item: any) => <Item key={item.id}>{item.name}</Item>}
                </Picker>
            </View> 
            <View>
                <Button isDisabled={isEmpty(collectionOne) || isEmpty(collectionTwo)}
                 onPress={() => navigate(`/compare/${collectionOne}/${collectionTwo}`)} 
                 variant="cta">Compare</Button>
            </View>
        </Flex>
    )
}

export default CatalogCompareFields;