import { Flex, View, Image, Divider, Text} from "@adobe/react-spectrum"
import { useNavigate } from "react-router"

type CatalogCardProps = { 
    card: any,
}

const CatalogCard = ({card}: CatalogCardProps) => {
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate('/breeds/' + id);
    }

    return (
        <Flex direction={'column'}>
            <div
            onClick={() => handleClick(card.id)}
             style={{
                cursor: 'pointer',
            }} >
                <View borderRadius={'medium'} height="auto" width="size-3000">
                    <Image UNSAFE_style={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px', width: '100%'}} 
                    src={card.image.url} objectFit="cover" alt={card.name} />
                </View>
                <View 
                backgroundColor={'static-white'}
                UNSAFE_style={{
                    color: '#333',
                    borderBottomLeftRadius: '5px',
                    borderBottomRightRadius: '5px'
                    }}
                    marginBottom="size-100"
                >
                    <Flex direction={'column'} justifyContent='center' marginStart={'size-100'}>
                        <View>
                            <h3>{card.name}</h3>
                        </View>
                        <Divider />
                        <View>
                            <Text><strong>Life Span:</strong> {card.life_span}</Text>
                        </View>
                        <View>
                            <Text><strong>Height:</strong> {card.height.imperial} inches</Text>
                        </View>
                        <View>
                            <Text><strong>Weight:</strong> {card.weight.imperial} pounds</Text>
                        </View>
                    </Flex>
                </View>
            </div>
        </Flex>
    )
}

export default CatalogCard;