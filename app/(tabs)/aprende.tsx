import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    ScrollView, Image, Dimensions, Animated
} from 'react-native';

const { width } = Dimensions.get('window');

const CATEGORIAS = [
    { id: 'salud', nombre: 'Centro de salud', emoji: '🏥', color: '#E53935' },
    { id: 'escuela', nombre: 'Escuela', emoji: '🏫', color: '#1E88E5' },
    { id: 'cultural', nombre: 'Espacios culturales', emoji: '🎭', color: '#F4511E' },
    { id: 'seguridad', nombre: 'Seguridad', emoji: '🚔', color: '#43A047' },
];

const ESCENARIOS: { [key: string]: { imagen: any; pregunta: string; respuestaCorrecta: boolean; explicacion: string }[] } = {
    salud: [
        {
            imagen: require('../../assets/images/revision_salud.png'),
            pregunta: '¿Tiene la doctora que explicarte lo que va a hacer antes de tocarte?',
            respuestaCorrecta: true,
            explicacion: '¡Correcto! Siempre tienen que explicarte lo que van a hacer. Tu cuerpo es tuyo y tienes derecho a saberlo.',
        },
        {
            imagen: require('../../assets/images/escucha_salud.png'),
            pregunta: '¿Puedes contarle a la doctora cómo te sientes aunque sea difícil explicarlo?',
            respuestaCorrecta: true,
            explicacion: '¡Sí! Siempre puedes contar cómo te sientes. El médico está ahí para escucharte.',
        },
    ],
    escuela: [
        {
            imagen: require('../../assets/images/entrada_escuela.png'),
            pregunta: '¿Todos los niños y niñas tienen derecho a ir a la escuela?',
            respuestaCorrecta: true,
            explicacion: '¡Exacto! Todos los niños tienen derecho a la educación, sin importar de dónde vengan.',
        },
        {
            imagen: require('../../assets/images/patio_escuela.png'),
            pregunta: '¿Está bien que un compañero te quite el bocadillo?',
            respuestaCorrecta: false,
            explicacion: '¡No está bien! Nadie puede quitarte lo que es tuyo. Puedes pedir ayuda a un adulto.',
        },
    ],
    cultural: [
        {
            imagen: require('../../assets/images/clase_cultural.png'),
            pregunta: '¿Todos los niños pueden participar en los talleres, incluido el niño en silla de ruedas?',
            respuestaCorrecta: true,
            explicacion: '¡Sí! Todos los niños tienen derecho a participar en actividades culturales sin importar su condición.',
        },
        {
            imagen: require('../../assets/images/entrada_casal.png'),
            pregunta: '¿Está bien que solo dejen entrar a algunos niños al casal?',
            respuestaCorrecta: false,
            explicacion: '¡No está bien! Los espacios públicos son para todos. Si te dicen que no puedes entrar sin razón, cuéntaselo a un adulto.',
        },
    ],
    seguridad: [
        {
            imagen: require('../../assets/images/policias.png'),
            pregunta: '¿Tiene el policía que explicarte por qué te para?',
            respuestaCorrecta: true,
            explicacion: '¡Sí! Siempre tienen que decirte por qué te paran y qué van a hacer.',
        },
        {
            imagen: require('../../assets/images/bomberos.png'),
            pregunta: '¿Puedes pedir ayuda a los bomberos si ves un peligro?',
            respuestaCorrecta: true,
            explicacion: '¡Claro que sí! Los bomberos y los servicios de emergencia están para ayudarte. Llama al 112.',
        },
    ],
};

export default function PantallaAprende() {
    const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
    const [escenarioIndex, setEscenarioIndex] = useState(0);
    const [respuesta, setRespuesta] = useState<boolean | null>(null);
    const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
    const [puntos, setPuntos] = useState(0);
    const [finalizado, setFinalizado] = useState(false);

    const categoriaData = categoriaActiva ? CATEGORIAS.find(c => c.id === categoriaActiva) : null;
    const escenarios = categoriaActiva ? ESCENARIOS[categoriaActiva] : [];
    const escenarioActual = escenarios[escenarioIndex];

    const responder = (respuestaUsuario: boolean) => {
        if (respuesta !== null) return;
        setRespuesta(respuestaUsuario);
        setMostrarExplicacion(true);
        if (respuestaUsuario === escenarioActual.respuestaCorrecta) {
            setPuntos(p => p + 1);
        }
    };

    const siguiente = () => {
        if (escenarioIndex + 1 >= escenarios.length) {
            setFinalizado(true);
        } else {
            setEscenarioIndex(i => i + 1);
            setRespuesta(null);
            setMostrarExplicacion(false);
        }
    };

    const reiniciar = () => {
        setCategoriaActiva(null);
        setEscenarioIndex(0);
        setRespuesta(null);
        setMostrarExplicacion(false);
        setPuntos(0);
        setFinalizado(false);
    };

    // PANTALLA FINAL
    if (finalizado && categoriaData) {
        return (
            <View style={[styles.container, styles.centrado]}>
                <Text style={styles.finEmoji}>🎉</Text>
                <Text style={styles.finTitulo}>¡Has terminado!</Text>
                <Text style={styles.finSubtitulo}>{categoriaData.nombre}</Text>
                <Text style={styles.finPuntos}>{puntos} / {escenarios.length} correctas</Text>
                <TouchableOpacity style={[styles.botonSiguiente, { backgroundColor: categoriaData.color }]} onPress={reiniciar}>
                    <Text style={styles.botonTexto}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // PANTALLA DE ESCENARIO
    if (categoriaActiva && escenarioActual && categoriaData) {
        const esCorrecta = respuesta === escenarioActual.respuestaCorrecta;
        return (
            <View style={styles.container}>
                {/* Header */}
                <View style={[styles.header, { backgroundColor: categoriaData.color }]}>
                    <TouchableOpacity onPress={reiniciar}>
                        <Text style={styles.headerBack}>← </Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitulo}>{categoriaData.emoji} {categoriaData.nombre}</Text>
                    <Text style={styles.headerProgreso}>{escenarioIndex + 1}/{escenarios.length}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.escenarioContenido}>
                    {/* Imagen */}
                    <Image
                        source={escenarioActual.imagen}
                        style={styles.imagen}
                        resizeMode="cover"
                    />

                    {/* Pregunta */}
                    <Text style={styles.pregunta}>{escenarioActual.pregunta}</Text>

                    {/* Botones SÍ / NO */}
                    {!mostrarExplicacion && (
                        <View style={styles.botonesRespuesta}>
                            <TouchableOpacity
                                style={[styles.botonNo]}
                                onPress={() => responder(false)}
                            >
                                <Text style={styles.botonRespuestaTexto}>❌ NO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.botonSi]}
                                onPress={() => responder(true)}
                            >
                                <Text style={styles.botonRespuestaTexto}>✅ SÍ</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Explicación */}
                    {mostrarExplicacion && (
                        <View style={[styles.explicacionCaja, { borderColor: esCorrecta ? '#43A047' : '#E53935' }]}>
                            <Text style={styles.explicacionEmoji}>{esCorrecta ? '✅' : '❌'}</Text>
                            <Text style={styles.explicacionTexto}>{escenarioActual.explicacion}</Text>
                            <TouchableOpacity
                                style={[styles.botonSiguiente, { backgroundColor: categoriaData.color }]}
                                onPress={siguiente}
                            >
                                <Text style={styles.botonTexto}>
                                    {escenarioIndex + 1 >= escenarios.length ? '¡Terminar!' : 'Siguiente →'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }

    // PANTALLA DE CATEGORÍAS
    return (
        <View style={styles.container}>
            <View style={styles.aprendeHeader}>
                <Text style={styles.aprendeTitulo}>¿Qué quieres aprender hoy?</Text>
                <Text style={styles.aprendeSubtitulo}>Elige una categoría 👇</Text>
            </View>
            <ScrollView contentContainerStyle={styles.categoriasGrid}>
                {CATEGORIAS.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[styles.categoriaCard, { borderColor: cat.color }]}
                        onPress={() => {
                            setCategoriaActiva(cat.id);
                            setEscenarioIndex(0);
                            setRespuesta(null);
                            setMostrarExplicacion(false);
                            setPuntos(0);
                            setFinalizado(false);
                        }}
                    >
                        <Text style={styles.categoriaEmoji}>{cat.emoji}</Text>
                        <Text style={[styles.categoriaNombre, { color: cat.color }]}>{cat.nombre}</Text>
                        <Text style={styles.categoriaInfo}>{ESCENARIOS[cat.id].length} escenarios</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFDF7' },
    centrado: { justifyContent: 'center', alignItems: 'center', padding: 30 },

    // Header categoría activa
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12, paddingTop: 50,
    },
    headerBack: { color: '#fff', fontSize: 20, fontWeight: '700' },
    headerTitulo: { color: '#fff', fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },
    headerProgreso: { color: '#fff', fontSize: 14, fontWeight: '600' },

    // Escenario
    escenarioContenido: { padding: 20 },
    imagen: { width: '100%', height: 240, borderRadius: 20, marginBottom: 20 },
    pregunta: {
        fontSize: 20, fontWeight: '800', color: '#1a1a2e',
        textAlign: 'center', marginBottom: 28, lineHeight: 28,
    },
    botonesRespuesta: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
    botonNo: {
        flex: 1, backgroundColor: '#E53935', borderRadius: 50,
        paddingVertical: 18, alignItems: 'center',
        shadowColor: '#E53935', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
    },
    botonSi: {
        flex: 1, backgroundColor: '#43A047', borderRadius: 50,
        paddingVertical: 18, alignItems: 'center',
        shadowColor: '#43A047', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
    },
    botonRespuestaTexto: { color: '#fff', fontSize: 22, fontWeight: '900', letterSpacing: 2 },

    // Explicación
    explicacionCaja: {
        backgroundColor: '#fff', borderRadius: 20, borderWidth: 3,
        padding: 20, alignItems: 'center', marginTop: 8,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
    },
    explicacionEmoji: { fontSize: 40, marginBottom: 8 },
    explicacionTexto: { fontSize: 16, color: '#333', textAlign: 'center', lineHeight: 24, marginBottom: 16 },
    botonSiguiente: {
        paddingHorizontal: 32, paddingVertical: 14, borderRadius: 50, alignItems: 'center', width: '100%',
    },
    botonTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },

    // Pantalla categorías
    aprendeHeader: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16 },
    aprendeTitulo: { fontSize: 26, fontWeight: '900', color: '#1a1a2e', marginBottom: 4 },
    aprendeSubtitulo: { fontSize: 16, color: '#888' },
    categoriasGrid: { padding: 16, gap: 16 },
    categoriaCard: {
        backgroundColor: '#fff', borderRadius: 20, borderWidth: 3,
        padding: 24, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
    },
    categoriaEmoji: { fontSize: 48, marginBottom: 8 },
    categoriaNombre: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
    categoriaInfo: { fontSize: 13, color: '#aaa' },

    // Pantalla final
    finEmoji: { fontSize: 64, marginBottom: 12 },
    finTitulo: { fontSize: 28, fontWeight: '900', color: '#1a1a2e', marginBottom: 4 },
    finSubtitulo: { fontSize: 16, color: '#888', marginBottom: 12 },
    finPuntos: { fontSize: 40, fontWeight: '900', color: '#333', marginBottom: 24 },
});
