import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    ScrollView, Image
} from 'react-native';

const EMOCIONES_URL = 'https://noubarris-backend.onrender.com/api/emociones';

const SECCIONES = [
    { id: 'escuela', nombre: 'Escuela', emoji: '🏫', color: '#1E88E5' },
    { id: 'salud', nombre: 'Centro de salud', emoji: '🏥', color: '#E53935' },
    { id: 'cultura', nombre: 'Espacios culturales', emoji: '🎭', color: '#F4511E' },
    { id: 'seguridad', nombre: 'Seguridad', emoji: '🚔', color: '#43A047' },
];

const EMOCIONES_POR_SECCION: { [key: string]: { nombre: string; imagen: any }[] } = {
    escuela: [
        { nombre: 'Felicidad', imagen: require('../../assets/images/Felicidad.png') },
        { nombre: 'Enfado', imagen: require('../../assets/images/Enfado.png') },
        { nombre: 'Tristeza', imagen: require('../../assets/images/Tristeza.png') },
        { nombre: 'Diversión', imagen: require('../../assets/images/Diversión.png') },
    ],
    salud: [
        { nombre: 'Vergüenza', imagen: require('../../assets/images/Vergüenza.png') },
        { nombre: 'Amor', imagen: require('../../assets/images/Amor.png') },
        { nombre: 'Miedo', imagen: require('../../assets/images/Miedo.png') },
        { nombre: 'Enfado', imagen: require('../../assets/images/Enfado.png') },
    ],
    cultura: [
        { nombre: 'Vergüenza', imagen: require('../../assets/images/Vergüenza.png') },
        { nombre: 'Emociones encontradas', imagen: require('../../assets/images/Emociones encontradas.png') },
        { nombre: 'Confusión', imagen: require('../../assets/images/Confusión.png') },
        { nombre: 'Felicidad', imagen: require('../../assets/images/Felicidad.png') },
    ],
    seguridad: [
        { nombre: 'Vergüenza', imagen: require('../../assets/images/Vergüenza.png') },
        { nombre: 'Inseguridad', imagen: require('../../assets/images/Inseguridad.png') },
        { nombre: 'Amor', imagen: require('../../assets/images/Amor.png') },
        { nombre: 'Miedo', imagen: require('../../assets/images/Miedo.png') },
    ],
};

export default function PantallaBitacora() {
    const [seccionActiva, setSeccionActiva] = useState<string | null>(null);
    const [enviando, setEnviando] = useState(false);
    const [gracias, setGracias] = useState(false);
    const [emocionElegida, setEmocionElegida] = useState<string | null>(null);

    const seccionData = seccionActiva ? SECCIONES.find(s => s.id === seccionActiva) : null;
    const emociones = seccionActiva ? EMOCIONES_POR_SECCION[seccionActiva] : [];

    const elegirEmocion = async (emocion: string) => {
        setEmocionElegida(emocion);
        setEnviando(true);
        try {
            await fetch(EMOCIONES_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emocion, seccion: seccionActiva }),
            });
            setGracias(true);
        } catch (e) {
            console.error(e);
        } finally {
            setEnviando(false);
        }
    };

    const reiniciar = () => {
        setSeccionActiva(null);
        setGracias(false);
        setEmocionElegida(null);
    };

    // PANTALLA GRACIAS
    if (gracias && seccionData) {
        return (
            <View style={[styles.container, styles.centrado]}>
                <Text style={styles.graciasEmoji}>💛</Text>
                <Text style={styles.graciasTitulo}>¡Gracias!</Text>
                <Text style={styles.graciasSubtitulo}>
                    Has elegido sentirte con{'\n'}
                    <Text style={{ fontWeight: '900', color: seccionData.color }}>{emocionElegida}</Text>
                </Text>
                <TouchableOpacity
                    style={[styles.botonVolver, { backgroundColor: seccionData.color }]}
                    onPress={reiniciar}
                >
                    <Text style={styles.botonVolverTexto}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // PANTALLA EMOCIONES
    if (seccionActiva && seccionData) {
        return (
            <View style={styles.container}>
                <View style={[styles.header, { backgroundColor: seccionData.color }]}>
                    <TouchableOpacity onPress={reiniciar}>
                        <Text style={styles.headerBack}>← </Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitulo}>{seccionData.emoji} {seccionData.nombre}</Text>
                    <View style={{ width: 30 }} />
                </View>

                <View style={styles.preguntaContainer}>
                    <Text style={styles.pregunta}>¿Cómo te sientes hoy?</Text>
                    <Text style={styles.preguntaSub}>Toca la carita que mejor te describe</Text>
                </View>

                <View style={styles.emocionesGrid}>
                    {emociones.map((em) => (
                        <TouchableOpacity
                            key={em.nombre}
                            style={styles.emocionCard}
                            onPress={() => elegirEmocion(em.nombre)}
                            disabled={enviando}
                        >
                            <Image source={em.imagen} style={styles.emocionImagen} resizeMode="contain" />
                            <Text style={styles.emocionNombre}>{em.nombre}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }

    // PANTALLA SECCIONES
    return (
        <View style={styles.container}>
            <View style={styles.bitacoraHeader}>
                <Text style={styles.bitacoraTitulo}>Bitácora de emociones</Text>
                <Text style={styles.bitacoraSubtitulo}>¿Cómo te sientes hoy? Elige dónde has estado 👇</Text>
            </View>
            <ScrollView contentContainerStyle={styles.seccionesGrid}>
                {SECCIONES.map((sec) => (
                    <TouchableOpacity
                        key={sec.id}
                        style={[styles.seccionCard, { borderColor: sec.color }]}
                        onPress={() => setSeccionActiva(sec.id)}
                    >
                        <Text style={styles.seccionEmoji}>{sec.emoji}</Text>
                        <Text style={[styles.seccionNombre, { color: sec.color }]}>{sec.nombre}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFDF7' },
    centrado: { justifyContent: 'center', alignItems: 'center', padding: 30 },

    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12, paddingTop: 50,
    },
    headerBack: { color: '#fff', fontSize: 20, fontWeight: '700' },
    headerTitulo: { color: '#fff', fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },

    preguntaContainer: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 16, alignItems: 'center' },
    pregunta: { fontSize: 24, fontWeight: '900', color: '#1a1a2e', textAlign: 'center', marginBottom: 6 },
    preguntaSub: { fontSize: 15, color: '#888', textAlign: 'center' },

    emocionesGrid: {
        flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: 'center', gap: 16, padding: 16,
    },
    emocionCard: {
        width: '42%', backgroundColor: '#fff', borderRadius: 20,
        padding: 16, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
    },
    emocionImagen: { width: 90, height: 90, marginBottom: 10 },
    emocionNombre: { fontSize: 14, fontWeight: '700', color: '#333', textAlign: 'center' },

    graciasEmoji: { fontSize: 64, marginBottom: 16 },
    graciasTitulo: { fontSize: 28, fontWeight: '900', color: '#1a1a2e', marginBottom: 8 },
    graciasSubtitulo: { fontSize: 18, color: '#555', textAlign: 'center', lineHeight: 28, marginBottom: 32 },
    botonVolver: {
        paddingHorizontal: 32, paddingVertical: 14, borderRadius: 50, alignItems: 'center',
    },
    botonVolverTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },

    bitacoraHeader: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16 },
    bitacoraTitulo: { fontSize: 26, fontWeight: '900', color: '#1a1a2e', marginBottom: 4 },
    bitacoraSubtitulo: { fontSize: 15, color: '#888', lineHeight: 22 },

    seccionesGrid: { padding: 16, gap: 16 },
    seccionCard: {
        backgroundColor: '#fff', borderRadius: 20, borderWidth: 3,
        padding: 24, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
    },
    seccionEmoji: { fontSize: 48, marginBottom: 8 },
    seccionNombre: { fontSize: 18, fontWeight: '800' },
});
