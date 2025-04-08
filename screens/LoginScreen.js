import { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
    auth,
    signInWithEmailAndPassword
} from '../firebase';

export default function LoginScreen () {

    const navigation = useNavigation();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ errorMessage, setErrorMessage ] = useState('');

    const login = async () => {
        if (!email || !password) {
            setErrorMessage('Informe o e-mail e senha.');
            return;
        }

        if (!regexEmail.test(email)) {
            setErrorMessage('E-mail inválido');
            return;
        }

        if (!regexPassword.test(password)) {
            setErrorMessage('A senha deve conter no mínimo 8 caracteres, letra maiúscula, minúscula, número e símbolo');
            return;
        }

        setErrorMessage('');

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user);
            navigation.replace('Home');
        })
        .catch((error) => {
            setErrorMessage(error.message);
        })
    }

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Entrar</Text>
                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="black"
                    style={styles.input}
                    inputMode="email"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    placeholder="Senha"
                    placeholderTextColor="black"
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('ForgotPassword');
                    }}
                >
                    <Text>Esqueci a senha</Text>
                </TouchableOpacity>
                {errorMessage &&
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                <TouchableOpacity
                    onPress={() => {
                        login();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText} >Login</Text>
                </TouchableOpacity>

                <Text>Ainda não tem uma conta?</Text>

                <TouchableOpacity
                    onPress={() => {
                        navigation.push('Register');
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText} >Registrar-se</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 25
    },
    title: {
        fontSize: 45,
        textAlign: 'center',
        marginVertical: 40
    },
    input: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        fontSize: 20,
        color: 'black',
        marginVertical: 15
    },
    button: {
        backgroundColor: '#27428f',
        padding: 15,
        borderRadius: 15,
        marginVertical: 15
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    errorMessage: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red'
    }
})