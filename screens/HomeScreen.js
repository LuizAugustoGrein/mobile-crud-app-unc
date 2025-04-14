import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth, signOut } from '../firebase';
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen () {
    const navigation = useNavigation();

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <SafeAreaView>
            <Text style={styles.title} > Usuário Logado!</Text>
            <TouchableOpacity
                onPress={logout}
                style={styles.logoutButton}
            >
                <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>
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