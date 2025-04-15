import { SafeAreaView, Text, StyleSheet } from "react-native";
import { auth, signOut, db } from '../firebase';
import { DangerButton, PrimaryButton } from "../components/Buttons";
import { CustomTextInput } from "../components/CustomInputs";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function HomeScreen () {

    const logout = async () => {
        await signOut(auth);
    }

    const [text, setText] = useState('');
    const [list, setList] = useState([]);

    const loadRecords = async () => {
        const snapshot = await getDocs(collection(db, 'records'));
        const records = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setList(records);

        console.log(records);
    }

    useEffect(() => {
        loadRecords();
    }, []);

    const add = async () => {
        if (!text) {
            console.log('preencha o campo.');
            return;
        }

        await addDoc(collection(db, 'records'), {
            text: text
        });

        loadRecords();

        setText('');
    }
 
    return (
        <SafeAreaView style={{ margin: 20 }}>
            <Text style={styles.title} >TO DO LIST</Text>
            {/* <DangerButton text={'Desconectar'} action={logout} /> */}

            <CustomTextInput placeholder={'Digite o texto...'} value={text} setValue={setText} />

            <PrimaryButton text="Adicionar Registro" action={() => {
                add();
            }} />

            {list.map((item) => (
                <Text key={item.id}>{item.text}</Text>
            ))}
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