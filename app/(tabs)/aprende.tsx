import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    ScrollView, Image, Dimensions
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
            imagen: require('../../assets/images/RecepcionSalud.png'),
            pregunta: '¿Te sentiste bien recibido/a al ingresar al centro de salud?',
            respuestaCorrecta: true,
            explicacion: 'Debes sentirte bien recibido o recibida en los espacios públicos de atención. Deben hablar en calma y con palabras agradables. Siempre debes estar acompañado/a de una persona adulta.',
        },
        {
            imagen: require('../../assets/images/EscuchaSalud.png'),
            pregunta: '¿La persona que te atendió escuchó cómo te sentías?',
            respuestaCorrecta: true,
            explicacion: 'Deben escuchar atentamente tus necesidades, es tu cuerpo el que revisarán y tienen que saber qué es lo que te pasa.',
        },
        {
            imagen: require('../../assets/images/RevisionSalud.png'),
            pregunta: '¿Te avisaron antes de tocar tu cuerpo para revisarlo?',
            respuestaCorrecta: true,
            explicacion: '¡Tu cuerpo es tuyo! Y deben explicarte que van a tocarlo para la revisión médica. Es importante que entiendas lo que están revisando de tu cuerpo y que te sientas seguro/a mientras lo hacen.',
        },
        {
            imagen: require('../../assets/images/SalidaCap.png'),
            pregunta: '¿Te has ido del centro de salud sintiéndote bien por el trato recibido?',
            respuestaCorrecta: true,
            explicacion: 'Muchas veces no nos agrada asistir a los centros de salud. Pero, si nos tratan bien y nos sentimos seguros/as, ¡la experiencia es mucho mejor! Asegúrate de haber recibido un buen trato.',
        },
    ],
    escuela: [
        {
            imagen: require('../../assets/images/EntradaEscuela.png'),
            pregunta: '¿Sientes que te reconocen cuando entras a la escuela?',
            respuestaCorrecta: true,
            explicacion: 'Eres una persona importante. ¡Deben reconocerte y hacerte sentir parte de este espacio!',
        },
        {
            imagen: require('../../assets/images/AulaEscuela.png'),
            pregunta: '¿Te sientes seguro/a cuando una persona adulta habla contigo a solas en la escuela?',
            respuestaCorrecta: true,
            explicacion: 'En la escuela debes sentirte seguro/a. Si tuvieras que estar a solas con una persona adulta, deben tratarte con respeto y cuidado.',
        },
        {
            imagen: require('../../assets/images/patio_escuela.png'),
            pregunta: '¿Sientes que puedes jugar libremente en el patio?',
            respuestaCorrecta: true,
            explicacion: 'El derecho a jugar es de todos y todas. Debes asistir a una escuela donde te sientas tranquilo/a para jugar y aprender.',
        },
        {
            imagen: require('../../assets/images/LavabosEscuela.png'),
            pregunta: '¿Puedes usar todos los espacios de la escuela cuando lo necesitas?',
            respuestaCorrecta: true,
            explicacion: 'Debes tener acceso y facilidad para estar en todos los espacios de la escuela. Debes sentirte cómodo/a y seguro/a.',
        },
    ],
    cultural: [
        {
            imagen: require('../../assets/images/EntradaCasal.png'),
            pregunta: '¿Las personas te reciben bien cuando llegas?',
            respuestaCorrecta: true,
            explicacion: 'Eres una persona importante. ¡Deben reconocerte y hacerte sentir parte de este espacio!',
        },
        {
            imagen: require('../../assets/images/Clasecultural.png'),
            pregunta: '¿Sientes que todas las personas pueden participar en las actividades?',
            respuestaCorrecta: true,
            explicacion: 'Todas las personas tenemos derecho a participar de actividades que nos gusten. ¡Recuerda siempre participar con respeto en un grupo!',
        },
        {
            imagen: require('../../assets/images/EscuchaClaseCultural.png'),
            pregunta: '¿Sientes que las personas adultas del centro te escuchan cuando hablas?',
            respuestaCorrecta: true,
            explicacion: 'Tus emociones y sentimientos son muy importantes y valiosos. Debes sentir que te escuchan con atención y atienden a tus necesidades.',
        },
    ],
    seguridad: [
        {
            imagen: require('../../assets/images/BomberosSeguridad.png'),
            pregunta: '¿Crees que los y las bomberos te ayudarían si lo necesitas?',
            respuestaCorrecta: true,
            explicacion: 'Los y las bomberos están para ayudar y proteger a las personas cuando ocurre una emergencia. Debes sentirte seguro/a y poder pedir ayuda si la necesitas.',
        },
        {
            imagen: require('../../assets/images/PoliciasSeguridad.png'),
            pregunta: '¿Te sentirías cómodo/a pidiendo ayuda a la policía?',
            respuestaCorrecta: true,
            explicacion: 'La policía debe ayudarte y escucharte con respeto. Si alguna vez te sientes perdido/a, inseguro/a o necesitas ayuda, puedes acudir a ellos junto a una persona adulta de confianza.',
        },
        {
            imagen: require('../../assets/images/Paramedicos seguridad.svg'),
            pregunta: '¿Crees que las personas de atención a la salud te cuidarían si te encuentras mal?',
            respuestaCorrecta: true,
            explicacion: 'Las personas de atención médica están para cuidar tu salud y ayudarte cuando no te sientes bien. Deben tratarte con respeto y hacerte sentir seguro/a.',
        },
        {
            imagen: require('../../assets/images/ServiciosSocialesSeguridad.png'),
            pregunta: '¿Podrías hablar con una educadora o trabajadora social si necesitas ayuda?',
            respuestaCorrecta: true,
            explicacion: 'Las educadoras y trabajadoras sociales están para acompañarte y ayudarte cuando tienes un problema o necesitas hablar. Tus emociones, dudas y necesidades son importantes.',
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

    if (categoriaActiva && escenarioActual && categoriaData) {
        const esCorrecta = respuesta === escenarioActual.respuestaCorrecta;
        return (
            <View style={styles.container}>
                <View style={[styles.header, { backgroundColor: categoriaData.color }]}>
                    <TouchableOpacity onPress={reiniciar}>
                        <Text style={styles.headerBack}>← </Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitulo}>{categoriaData.emoji} {categoriaData.nombre}</Text>
                    <Text style={styles.headerProgreso}>{escenarioIndex + 1}/{escenarios.length}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.escenarioContenido}>
                    <Image source={escenarioActual.imagen} style={styles.imagen} resizeMode="cover" />
                    <Text style={styles.pregunta}>{escenarioActual.pregunta}</Text>
                    {!mostrarExplicacion && (
                        <View style={styles.botonesRespuesta}>
                            <TouchableOpacity style={[styles.botonNo]} onPress={() => responder(false)}>
                                <Text style={styles.botonRespuestaTexto}>❌ NO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.botonSi]} onPress={() => responder(true)}>
                                <Text style={styles.botonRespuestaTexto}>✅ SÍ</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {mostrarExplicacion && (
                        <View style={[styles.explicacionCaja, { borderColor: esCorrecta ? '#43A047' : '#E53935' }]}>
                            <Text style={styles.explicacionEmoji}>{esCorrecta ? '✅' : '❌'}</Text>
                            <Text style={styles.explicacionTexto}>{escenarioActual.explicacion}</Text>
                            <TouchableOpacity style={[styles.botonSiguiente, { backgroundColor: categoriaData.color }]} onPress={siguiente}>
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
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12, paddingTop: 50,
    },
    headerBack: { color: '#fff', fontSize: 20, fontWeight: '700' },
    headerTitulo: { color: '#fff', fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },
    headerProgreso: { color: '#fff', fontSize: 14, fontWeight: '600' },
    escenarioContenido: { padding: 20 },
    imagen: { width: '100%', height: 240, borderRadius: 20, marginBottom: 20 },
    pregunta: { fontSize: 20, fontWeight: '800', color: '#1a1a2e', textAlign: 'center', marginBottom: 28, lineHeight: 28 },
    botonesRespuesta: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
    botonNo: {
        flex: 1, backgroundColor: '#E53935', borderRadius: 50, paddingVertical: 18, alignItems: 'center',
        shadowColor: '#E53935', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
    },
    botonSi: {
        flex: 1, backgroundColor: '#43A047', borderRadius: 50, paddingVertical: 18, alignItems: 'center',
        shadowColor: '#43A047', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
    },
    botonRespuestaTexto: { color: '#fff', fontSize: 22, fontWeight: '900', letterSpacing: 2 },
    explicacionCaja: {
        backgroundColor: '#fff', borderRadius: 20, borderWidth: 3, padding: 20, alignItems: 'center', marginTop: 8,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
    },
    explicacionEmoji: { fontSize: 40, marginBottom: 8 },
    explicacionTexto: { fontSize: 16, color: '#333', textAlign: 'center', lineHeight: 24, marginBottom: 16 },
    botonSiguiente: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 50, alignItems: 'center', width: '100%' },
    botonTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
    aprendeHeader: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16 },
    aprendeTitulo: { fontSize: 26, fontWeight: '900', color: '#1a1a2e', marginBottom: 4 },
    aprendeSubtitulo: { fontSize: 16, color: '#888' },
    categoriasGrid: { padding: 16, gap: 16 },
    categoriaCard: {
        backgroundColor: '#fff', borderRadius: 20, borderWidth: 3, padding: 24, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
    },
    categoriaEmoji: { fontSize: 48, marginBottom: 8 },
    categoriaNombre: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
    categoriaInfo: { fontSize: 13, color: '#aaa' },
    finEmoji: { fontSize: 64, marginBottom: 12 },
    finTitulo: { fontSize: 28, fontWeight: '900', color: '#1a1a2e', marginBottom: 4 },
    finSubtitulo: { fontSize: 16, color: '#888', marginBottom: 12 },
    finPuntos: { fontSize: 40, fontWeight: '900', color: '#333', marginBottom: 24 },
});