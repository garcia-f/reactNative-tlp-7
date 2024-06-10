import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router'; 
import { LoginErrors } from '@/types/validationErrors'; 

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginErrors>({});

    const validate = () => {
        const newErrors: LoginErrors = {};
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        
        if (!username.length) newErrors.name = 'El nombre de usuario es requerido';
        if (username.length < 5) newErrors.name = 'El nombre de usuario debe tener por lo menos 5 caracteres';
        if (username.length > 10) newErrors.name = 'El nombre de usuario debe tener como máximo 10 caracteres';
        if (!password.length) newErrors.password = 'La contraseña es requerida';
        if (password.length < 5) newErrors.password = 'La contraseña debe tener al menos 5 caracteres';
        if (password === password.toUpperCase()) newErrors.password = 'La contraseña debe tener al menos 1 letra minúscula';
        if (password === password.toLowerCase()) newErrors.password = 'La contraseña debe tener al menos 1 letra mayúscula';
        if (!symbolRegex.test(password)) newErrors.password = 'La contraseña debe tener al menos 1 símbolo';
        
        return newErrors;
    }

    const handleLogin = () => {
        const validatedErrors = validate();
        if (Object.keys(validatedErrors).length) {
            setErrors(validatedErrors);
        } else {
            setErrors({});
            router.replace('/task'); // Utiliza router para la navegación
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
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

export default LoginForm;
