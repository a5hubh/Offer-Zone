import React, { useEffect } from "react";
import {
    RefreshControl,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DoubleClick from "react-native-double-tap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import styles from "../styles/CardStyles";
import { AuthContext } from "../components/context/Store";
import axiosURL from "../helper/AxiosURL";
import axios from "axios";

const windowWidth = Dimensions.get("screen").width;

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MyShopsCard = (props) => {
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = React.useState(false);
    const { startLoading, stopLoading } = React.useContext(AuthContext);
    const [userID, setUserID] = React.useState(false);

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                return value;
            }
        } catch (error) { }
    };

    const onSingleTap = (shop_id, shop_name) => {
        startLoading();
        axios
            .get(`${axiosURL}/seller/getShopOffers/${shop_id}`)
            .then((response) => {
                // console.log(response.data.response);
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        //setOfferData(response.data.response);
                        stopLoading();
                        props.navigation.navigate("ShopOffers", {
                            offerData: response.data.response,
                            shopName: shop_name,
                        });
                    } else {
                        stopLoading();
                        props.navigation.navigate("ShopOffers", {
                            offerData: "No Offers",
                            shopName: shop_name,
                        });
                    }
                }
                else {
                    alert("Offer Zone server is down,you can try after some time.")
                }

            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        _retrieveData().then((response) => {
            setUserID(response);
        });
    }, []);

    const onRefresh = React.useCallback((seller_id) => {
        setRefreshing(true);
        props.getMyShops(seller_id);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            {props.shopData !== null ? (
                <View>
                    {props.shopData === "No Shops" ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        onRefresh(props.User);
                                    }}
                                    colors={["#fff", "red", "yellow"]}
                                    progressBackgroundColor={"#000"}
                                />
                            }
                            animation="fadeInRightBig"
                            style={{ marginBottom: 60 }}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Text
                                    style={[
                                        styles.errorMessageText,
                                        { width: windowWidth * 0.9 },
                                    ]}
                                >
                                    Sorry, you haven't added any shop!
                                </Text>
                                <Image
                                    source={require("../../assets/sad_folder.png")}
                                    style={{ width: 200, height: 200 }}
                                    resizeMode="stretch"
                                />
                            </View>
                        </ScrollView>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        onRefresh(userID);
                                    }}
                                    colors={["#fff", "red", "yellow"]}
                                    progressBackgroundColor={"#000"}
                                />
                            }
                            style={{ marginBottom: 10, marginTop: 5 }}
                            animation="fadeInRightBig"
                        >
                            {props.shopData.map((element, index) => (
                                <View
                                    style={[
                                        styles.cardView,
                                        { backgroundColor: colors.offerCard },
                                    ]}
                                    elevation={3}
                                    key={index}
                                >
                                    <DoubleClick
                                        singleTap={() => {
                                            onSingleTap(
                                                element.shop_id,
                                                element.shop_name
                                            );
                                        }}
                                        delay={500}
                                    >
                                        <View style={styles.cardData}>
                                            <Text
                                                style={[
                                                    styles.cardTitle,
                                                    { color: colors.text },
                                                ]}
                                                numberOfLines={2}
                                                ellipsizeMode="tail"
                                            >
                                                {element.shop_name}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.cardSubtitle,
                                                    { color: colors.text },
                                                ]}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.category}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.cardSubtitle2,
                                                    { color: colors.subtext },
                                                ]}
                                                numberOfLines={2}
                                                ellipsizeMode="tail"
                                            >
                                                {element.shop_address},{" "}
                                                {element.city}, {element.state},{" "}
                                                {element.country},{" "}
                                                {element.zipcode}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.cardFooter,
                                                    { color: colors.text },
                                                ]}
                                            >
                                                {element.offer.length} Offers
                                            </Text>
                                            <View style={styles.line} />
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    marginTop: 10,
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        marginLeft:
                                                            windowWidth * 0.03,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <FontAwesome5
                                                            name="edit"
                                                            color={
                                                                colors.editIcon
                                                            }
                                                            size={25}
                                                            onPress={() => {
                                                                props.updateShopHandler(
                                                                    element.shop_id
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{
                                                        marginLeft:
                                                            windowWidth * 0.09,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <FontAwesome5
                                                            name="trash"
                                                            color={
                                                                colors.deleteIcon
                                                            }
                                                            size={25}
                                                            onPress={() => {
                                                                props.deleteShopHandler(
                                                                    element.shop_id
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </DoubleClick>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
            ) : (
                <View>
                    <Image
                        source={require("../../assets/tenor.gif")}
                        style={{ width: 200, height: 200 }}
                        resizeMode="stretch"
                    />
                </View>
            )}
        </View>
    );
};

export default MyShopsCard;
