import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#006064",
        height: "10%",
        flexDirection: "row",
    },
    closeIcon: {
        marginLeft: 20,
        marginTop: "auto",
        marginBottom: "auto",
    },
    title: {
        color: "#fff",
        fontSize: 25,
        width: 100,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",
        textTransform: "uppercase",
    },
    resetButton: {
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: 20,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 10,
        textTransform: "uppercase",
    },
    textCon: {
        width: "90%",
        marginLeft: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    colorGrey: {
        color: "#555555",
    },
    colorYellow: {
        color: "#B20000",
    },
    applyButton: {
        backgroundColor: "#5B5B5B",
        height: "151%",
    },
    bottomView: {
        position: "absolute",
        bottom: 15,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",
    },
});

export default styles;
