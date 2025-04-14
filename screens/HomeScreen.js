import { SafeAreaView, Text, StyleSheet } from "react-native";
import { auth, signOut } from '../firebase';
import { DangerButton } from "../components/Buttons";

export default function HomeScreen () {

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <SafeAreaView>
            <Text style={styles.title} > Usuário Logado!</Text>
            <DangerButton text={'Desconectar'} action={logout} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30,
        margin: 40
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 15,
        margin: 30,
        borderRadius: 15
    },
    logoutButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})