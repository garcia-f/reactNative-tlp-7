import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router'; 
import { RegisterErrors } from '@/types/validationErrors'; 
import {users} from '../data/user';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<RegisterErrors>({});

    const validate = () => {
        const newErrors: RegisterErrors = {};
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        
        if (!username.length) newErrors.name = 'El nombre de usuario es requerido';
        if (username.length < 5) newErrors.name = 'El nombre de usuario debe tener por lo menos 5 caracteres';
        if (username.length > 10) newErrors.name = 'El nombre de usuario debe tener como máximo 10 caracteres';
        if (!password.length) newErrors.password = 'La contraseña es requerida';
        if (password.length < 5) newErrors.password = 'La contraseña debe tener al menos 5 caracteres';
        if (password === password.toUpperCase()) newErrors.password = 'La contraseña debe tener al menos 1 letra minúscula';
        if (password === password.toLowerCase()) newErrors.password = 'La contraseña debe tener al menos 1 letra mayúscula';
        if (!symbolRegex.test(password)) newErrors.password = 'La contraseña debe tener al menos 1 símbolo';
        if (password !== password2) newErrors.password2 = 'Las contraseñas no coinciden';
        
        return newErrors;
    }

    const handleRegister = () => {
        const user = users.find((user) => user.name === username && user.password === password);
        const validatedErrors = validate();
        if (Object.keys(validatedErrors).length) {
            setErrors(validatedErrors);
        } else {
            if (!user){
                users.push({id: users.length + 1, name: username, password: password}) 
                setErrors({});
                router.replace('/tasks'); // Utiliza router para la navegación
            } else {
                setErrors({name: 'El nombre de usuario ya existe'});
            }   
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={value => setUsername(value)}
                value={username}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={value => setPassword(value)}
                value={password}
                secureTextEntry={true}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Confirmar Password"
                onChangeText={value => setPassword2(value)}
                value={password2}
                secureTextEntry={true}
            />
            {errors.password2 && <Text style={styles.error}>{errors.password2}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RegisterForm;
