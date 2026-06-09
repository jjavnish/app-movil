import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Text,
  TouchableOpacity, Linking, Animated, ScrollView, Modal, TextInput, Image
} from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
const FelicidadSvg = require('../../assets/images/Felicidad.png');
const NeutroSvg = require('../../assets/images/Emociones encontradas.png');
const TristeSvg = require('../../assets/images/Tristeza.png');

const API_URL = 'https://noubarris-backend.onrender.com/api/centros';
const RESENAS_URL = 'https://noubarris-backend.onrender.com/api/resenas';

const worldCoords = [
  { latitude: 85, longitude: -180 },
  { latitude: 85, longitude: 180 },
  { latitude: -85, longitude: 180 },
  { latitude: -85, longitude: -180 },
];

const siluetaNouBarris = [
  { latitude: 41.467717, longitude: 2.187061 },
  { latitude: 41.463796, longitude: 2.187454 },
  { latitude: 41.462081, longitude: 2.187445 },
  { latitude: 41.461684, longitude: 2.187438 },
  { latitude: 41.460718, longitude: 2.187528 },
  { latitude: 41.459998, longitude: 2.187595 },
  { latitude: 41.459761, longitude: 2.187624 },
  { latitude: 41.459514, longitude: 2.187663 },
  { latitude: 41.459233, longitude: 2.187719 },
  { latitude: 41.458945, longitude: 2.187824 },
  { latitude: 41.45872, longitude: 2.187907 },
  { latitude: 41.458521, longitude: 2.187985 },
  { latitude: 41.458318, longitude: 2.188071 },
  { latitude: 41.45825, longitude: 2.188116 },
  { latitude: 41.457767, longitude: 2.188422 },
  { latitude: 41.457362, longitude: 2.188737 },
  { latitude: 41.457319, longitude: 2.188776 },
  { latitude: 41.457098, longitude: 2.188414 },
  { latitude: 41.45598, longitude: 2.188409 },
  { latitude: 41.454844, longitude: 2.188775 },
  { latitude: 41.452038, longitude: 2.188883 },
  { latitude: 41.448858, longitude: 2.188337 },
  { latitude: 41.446446, longitude: 2.187538 },
  { latitude: 41.442224, longitude: 2.186176 },
  { latitude: 41.439704, longitude: 2.185429 },
  { latitude: 41.435656, longitude: 2.184067 },
  { latitude: 41.43212, longitude: 2.182877 },
  { latitude: 41.430637, longitude: 2.182787 },
  { latitude: 41.428723, longitude: 2.184122 },
  { latitude: 41.427714, longitude: 2.182532 },
  { latitude: 41.427895, longitude: 2.17907 },
  { latitude: 41.427342, longitude: 2.177221 },
  { latitude: 41.425455, longitude: 2.176212 },
  { latitude: 41.425609, longitude: 2.175674 },
  { latitude: 41.427049, longitude: 2.170452 },
  { latitude: 41.427492, longitude: 2.16784 },
  { latitude: 41.427775, longitude: 2.165165 },
  { latitude: 41.427911, longitude: 2.16422 },
  { latitude: 41.428065, longitude: 2.163688 },
  { latitude: 41.428956, longitude: 2.164966 },
  { latitude: 41.430766, longitude: 2.164311 },
  { latitude: 41.431822, longitude: 2.163326 },
  { latitude: 41.432332, longitude: 2.163143 },
  { latitude: 41.433032, longitude: 2.163153 },
  { latitude: 41.4352, longitude: 2.163802 },
  { latitude: 41.436542, longitude: 2.163335 },
  { latitude: 41.436704, longitude: 2.163247 },
  { latitude: 41.436767, longitude: 2.163289 },
  { latitude: 41.436801, longitude: 2.163312 },
  { latitude: 41.436995, longitude: 2.163445 },
  { latitude: 41.437193, longitude: 2.163366 },
  { latitude: 41.437282, longitude: 2.163213 },
  { latitude: 41.437323, longitude: 2.163209 },
  { latitude: 41.437361, longitude: 2.163137 },
  { latitude: 41.437419, longitude: 2.163189 },
  { latitude: 41.437561, longitude: 2.16334 },
  { latitude: 41.437613, longitude: 2.163394 },
  { latitude: 41.437675, longitude: 2.163459 },
  { latitude: 41.437776, longitude: 2.163569 },
  { latitude: 41.437803, longitude: 2.163598 },
  { latitude: 41.437834, longitude: 2.163632 },
  { latitude: 41.437862, longitude: 2.163656 },
  { latitude: 41.438627, longitude: 2.162382 },
  { latitude: 41.43895, longitude: 2.162022 },
  { latitude: 41.439182, longitude: 2.161836 },
  { latitude: 41.439664, longitude: 2.1618 },
  { latitude: 41.439776, longitude: 2.161673 },
  { latitude: 41.440013, longitude: 2.161542 },
  { latitude: 41.440271, longitude: 2.16155 },
  { latitude: 41.440526, longitude: 2.161705 },
  { latitude: 41.440701, longitude: 2.161961 },
  { latitude: 41.440788, longitude: 2.162281 },
  { latitude: 41.441325, longitude: 2.162401 },
  { latitude: 41.441607, longitude: 2.161538 },
  { latitude: 41.441716, longitude: 2.161288 },
  { latitude: 41.442024, longitude: 2.160596 },
  { latitude: 41.442039, longitude: 2.160563 },
  { latitude: 41.442134, longitude: 2.160331 },
  { latitude: 41.442278, longitude: 2.160067 },
  { latitude: 41.442285, longitude: 2.159818 },
  { latitude: 41.442376, longitude: 2.159187 },
  { latitude: 41.442713, longitude: 2.158928 },
  { latitude: 41.44348, longitude: 2.158493 },
  { latitude: 41.443998, longitude: 2.158294 },
  { latitude: 41.444252, longitude: 2.15798 },
  { latitude: 41.444706, longitude: 2.157837 },
  { latitude: 41.445044, longitude: 2.157378 },
  { latitude: 41.445209, longitude: 2.15683 },
  { latitude: 41.445458, longitude: 2.156356 },
  { latitude: 41.445551, longitude: 2.156028 },
  { latitude: 41.445585, longitude: 2.155743 },
  { latitude: 41.445732, longitude: 2.155759 },
  { latitude: 41.445778, longitude: 2.155904 },
  { latitude: 41.445882, longitude: 2.156653 },
  { latitude: 41.446052, longitude: 2.157253 },
  { latitude: 41.446608, longitude: 2.15759 },
  { latitude: 41.447019, longitude: 2.157517 },
  { latitude: 41.447279, longitude: 2.157117 },
  { latitude: 41.447433, longitude: 2.157042 },
  { latitude: 41.44747, longitude: 2.157493 },
  { latitude: 41.447612, longitude: 2.15778 },
  { latitude: 41.448406, longitude: 2.158639 },
  { latitude: 41.448892, longitude: 2.159009 },
  { latitude: 41.449502, longitude: 2.159426 },
  { latitude: 41.450191, longitude: 2.159375 },
  { latitude: 41.450518, longitude: 2.159109 },
  { latitude: 41.450349, longitude: 2.160185 },
  { latitude: 41.450327, longitude: 2.161043 },
  { latitude: 41.450258, longitude: 2.16186 },
  { latitude: 41.450053, longitude: 2.162298 },
  { latitude: 41.449826, longitude: 2.162685 },
  { latitude: 41.449778, longitude: 2.163071 },
  { latitude: 41.449805, longitude: 2.163473 },
  { latitude: 41.449771, longitude: 2.163893 },
  { latitude: 41.449815, longitude: 2.164141 },
  { latitude: 41.450103, longitude: 2.164224 },
  { latitude: 41.450471, longitude: 2.164319 },
  { latitude: 41.450721, longitude: 2.164488 },
  { latitude: 41.450957, longitude: 2.164707 },
  { latitude: 41.451173, longitude: 2.164963 },
  { latitude: 41.451348, longitude: 2.165374 },
  { latitude: 41.451524, longitude: 2.165584 },
  { latitude: 41.451795, longitude: 2.165568 },
  { latitude: 41.452249, longitude: 2.165333 },
  { latitude: 41.452602, longitude: 2.16486 },
  { latitude: 41.452912, longitude: 2.164862 },
  { latitude: 41.453229, longitude: 2.164896 },
  { latitude: 41.453632, longitude: 2.164826 },
  { latitude: 41.453928, longitude: 2.16482 },
  { latitude: 41.454482, longitude: 2.164956 },
  { latitude: 41.454943, longitude: 2.164733 },
  { latitude: 41.455447, longitude: 2.164301 },
  { latitude: 41.456135, longitude: 2.164296 },
  { latitude: 41.456587, longitude: 2.164576 },
  { latitude: 41.457051, longitude: 2.164893 },
  { latitude: 41.457614, longitude: 2.165271 },
  { latitude: 41.457921, longitude: 2.165499 },
  { latitude: 41.458185, longitude: 2.16567 },
  { latitude: 41.458416, longitude: 2.165799 },
  { latitude: 41.459175, longitude: 2.166921 },
  { latitude: 41.4598, longitude: 2.167166 },
  { latitude: 41.459931, longitude: 2.167525 },
  { latitude: 41.460206, longitude: 2.167333 },
  { latitude: 41.460472, longitude: 2.167242 },
  { latitude: 41.460704, longitude: 2.168144 },
  { latitude: 41.460497, longitude: 2.168267 },
  { latitude: 41.46032, longitude: 2.168429 },
  { latitude: 41.460677, longitude: 2.169549 },
  { latitude: 41.461024, longitude: 2.170642 },
  { latitude: 41.460876, longitude: 2.171425 },
  { latitude: 41.461167, longitude: 2.17172 },
  { latitude: 41.461656, longitude: 2.172386 },
  { latitude: 41.462328, longitude: 2.173403 },
  { latitude: 41.462539, longitude: 2.173996 },
  { latitude: 41.462819, longitude: 2.17428 },
  { latitude: 41.463484, longitude: 2.174352 },
  { latitude: 41.463852, longitude: 2.174916 },
  { latitude: 41.463928, longitude: 2.176173 },
  { latitude: 41.464092, longitude: 2.176921 },
  { latitude: 41.464161, longitude: 2.177465 },
  { latitude: 41.464443, longitude: 2.178623 },
  { latitude: 41.46494, longitude: 2.180712 },
  { latitude: 41.465878, longitude: 2.179466 },
  { latitude: 41.4668, longitude: 2.178789 },
  { latitude: 41.467947, longitude: 2.17864 },
  { latitude: 41.467659, longitude: 2.18051 },
  { latitude: 41.467952, longitude: 2.182022 },
  { latitude: 41.468227, longitude: 2.183471 },
  { latitude: 41.468284, longitude: 2.184169 },
  { latitude: 41.467761, longitude: 2.185738 },
];

const coloresCategorias: { [key: string]: string } = {
  'Salud': '#E53935',
  'Seguridad': '#1E88E5',
  'Bibliotecas': '#8E24AA',
  'Culturales': '#F4511E',
  'Oficinas': '#43A047',
  'Servicios Sociales': '#FFB300',
  'Educativos': '#00ACC1',
};

const iconosCategorias: { [key: string]: string } = {
  'Salud': '🏥',
  'Seguridad': '🚔',
  'Bibliotecas': '📚',
  'Culturales': '🎭',
  'Oficinas': '🏛️',
  'Servicios Sociales': '🤝',
  'Educativos': '🎓',
};

type Centro = {
  id: number;
  nombre: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  categoria: string;
  direccion: string;
  telefono: string;
  web: string;
};

type PasoModal = 'elegir' | 'nino' | 'adulto' | 'gracias';

// Respuestas adulto
type RespuestasAdulto = {
  p3: string; p4: string; p5: string; p6: string;
  p7: string[]; p7_otro: string; p8: string; p9: string; p10: string;
};

const respuestasVacias: RespuestasAdulto = {
  p3: '', p4: '', p5: '', p6: '',
  p7: [], p7_otro: '', p8: '', p9: '', p10: '',
};

export default function PantallaMapa() {
  const [centros, setCentros] = useState<Centro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [centroSeleccionado, setCentroSeleccionado] = useState<Centro | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pasoModal, setPasoModal] = useState<PasoModal>('elegir');
  const [valoracionNino, setValoracionNino] = useState<number | null>(null);
  const [respAdulto, setRespAdulto] = useState<RespuestasAdulto>(respuestasVacias);
  const [enviando, setEnviando] = useState(false);
  const [filtroActivo, setFiltroActivo] = useState<string | null>(null);
  const panelAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => { setCentros(Array.isArray(data) ? data : []); setCargando(false); })
      .catch(() => {
        setError('No se pudo conectar al servidor.\nAsegúrate de estar en la misma red Wi-Fi.');
        setCargando(false);
      });
  }, []);

  const abrirPanel = (centro: Centro) => {
    setCentroSeleccionado(centro);
    Animated.spring(panelAnim, {
      toValue: 1, useNativeDriver: true, tension: 65, friction: 11,
    }).start();
  };

  const cerrarPanel = () => {
    Animated.timing(panelAnim, {
      toValue: 0, duration: 250, useNativeDriver: true,
    }).start(() => setCentroSeleccionado(null));
  };

  const abrirModal = () => {
    setValoracionNino(null);
    setRespAdulto(respuestasVacias);
    setPasoModal('elegir');
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setValoracionNino(null);
    setRespAdulto(respuestasVacias);
  };

  const toggleP7 = (opcion: string) => {
    setRespAdulto(prev => {
      const ya = prev.p7.includes(opcion);
      return { ...prev, p7: ya ? prev.p7.filter(o => o !== opcion) : [...prev.p7, opcion] };
    });
  };

  // Calcular valoración adulto como media de las preguntas cerradas
  const calcularValoracionAdulto = (): number => {
    const mapa: { [key: string]: number } = {
      'Sí': 3, 'Sí, en todo momento': 3, 'Muy buena': 3, 'Sí, definitivamente': 3,
      'En parte': 2, 'Parcialmente': 2, 'Solo en parte': 2, 'Regular': 2, 'No lo sé': 2, 'No lo necesitaba': 2,
      'No': 1, 'Mala': 1, 'Muy mala': 1,
    };
    const vals = [respAdulto.p3, respAdulto.p4, respAdulto.p5, respAdulto.p6, respAdulto.p8, respAdulto.p9, respAdulto.p10]
      .map(r => mapa[r] || 0).filter(v => v > 0);
    if (vals.length === 0) return 2;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const enviarResenaAdulto = async () => {
    if (!centroSeleccionado) return;
    const camposObligatorios = [respAdulto.p3, respAdulto.p4, respAdulto.p5, respAdulto.p6, respAdulto.p8, respAdulto.p9, respAdulto.p10];
    if (camposObligatorios.some(c => !c) || respAdulto.p7.length === 0) return;
    setEnviando(true);
    try {
      await fetch(RESENAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          centro_id: centroSeleccionado.id,
          tipo_usuario: 'adulto',
          valoracion: calcularValoracionAdulto(),
        }),
      });
      setPasoModal('gracias');
    } catch (e) { console.error(e); }
    finally { setEnviando(false); }
  };

  const enviarResenaНino = async () => {
    if (!valoracionNino || !centroSeleccionado) return;
    setEnviando(true);
    try {
      await fetch(RESENAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          centro_id: centroSeleccionado.id,
          tipo_usuario: 'nino',
          valoracion: valoracionNino,
        }),
      });
      setPasoModal('gracias');
    } catch (e) { console.error(e); }
    finally { setEnviando(false); }
  };

  const panelTranslate = panelAnim.interpolate({
    inputRange: [0, 1], outputRange: [400, 0],
  });

  const abrirTelefono = (tel: string) => {
    const numero = tel.replace(/[^0-9+]/g, '').slice(0, 12);
    if (numero) Linking.openURL(`tel:${numero}`);
  };
  const abrirWeb = (url: string) => { if (url) Linking.openURL(url); };

  if (cargando) return (
    <View style={styles.centrado}>
      <ActivityIndicator size="large" color="#333" />
      <Text style={styles.textoInfo}>Cargando centros...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.centrado}>
      <Text style={styles.textoError}>{error}</Text>
    </View>
  );

  const color = centroSeleccionado ? (coloresCategorias[centroSeleccionado.categoria] || '#333') : '#333';
  const icono = centroSeleccionado ? (iconosCategorias[centroSeleccionado.categoria] || '📍') : '📍';

  const adultoCompleto = [respAdulto.p3, respAdulto.p4, respAdulto.p5, respAdulto.p6,
  respAdulto.p8, respAdulto.p9, respAdulto.p10].every(c => c) && respAdulto.p7.length > 0;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ latitude: 41.4450, longitude: 2.1760, latitudeDelta: 0.055, longitudeDelta: 0.055 }}
        minZoomLevel={12} rotateEnabled={false} onPress={cerrarPanel}
      >
        <Polygon coordinates={worldCoords} fillColor="rgba(0,0,0,0.5)" strokeColor="transparent" zIndex={1} />
        <Polygon coordinates={siluetaNouBarris} fillColor="rgba(0,0,0,0)" strokeColor="rgba(255,255,255,0.4)" strokeWidth={2} zIndex={2} />
        {centros
          .filter(c => !filtroActivo || c.categoria === filtroActivo)
          .map((centro) => {
            const lat = parseFloat(centro.latitud);
            const lon = parseFloat(centro.longitud);
            if (isNaN(lat) || isNaN(lon)) return null;
            return (
              <Marker key={centro.id} coordinate={{ latitude: lat, longitude: lon }}
                pinColor={coloresCategorias[centro.categoria] || '#757575'} zIndex={3}
                onPress={(e) => { e.stopPropagation(); abrirPanel(centro); }}
              />
            );
          })}
      </MapView>

      {/* PANEL INFERIOR */}
      {/* FILTROS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosContainer}
        contentContainerStyle={styles.filtrosContent}
      >
        {Object.entries(coloresCategorias).map(([cat, color]) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filtroChip,
              { borderColor: color },
              filtroActivo === cat && { backgroundColor: color },
            ]}
            onPress={() => setFiltroActivo(filtroActivo === cat ? null : cat)}
          >
            <Text style={[
              styles.filtroTexto,
              { color: filtroActivo === cat ? '#fff' : color },
            ]}>
              {iconosCategorias[cat]} {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* BOTÓN FLOTANTE CUENTO CONTIGO */}
      {centroSeleccionado && (
        <TouchableOpacity style={styles.botonFlotante} onPress={abrirModal}>
          <Text style={styles.botonFlotanteTexto}>💬 Cuento contigo</Text>
        </TouchableOpacity>
      )}
      {centroSeleccionado && (
        <Animated.View style={[styles.panel, { transform: [{ translateY: panelTranslate }] }]}>
          <View style={[styles.panelBarra, { backgroundColor: color }]} />
          <TouchableOpacity style={styles.botonCerrar} onPress={cerrarPanel}>
            <Text style={styles.botonCerrarTexto}>✕</Text>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.panelCategoria, { color }]}>{icono} {centroSeleccionado.categoria}</Text>
            <Text style={styles.panelNombre}>{centroSeleccionado.nombre}</Text>
            {centroSeleccionado.descripcion ? <Text style={styles.panelDescripcion}>{centroSeleccionado.descripcion}</Text> : null}
            {centroSeleccionado.direccion ? (
              <View style={styles.panelFila}>
                <Text style={styles.panelIcono}>📍</Text>
                <Text style={styles.panelTexto}>{centroSeleccionado.direccion}</Text>
              </View>
            ) : null}
            {centroSeleccionado.telefono ? (
              <TouchableOpacity style={styles.panelFila} onPress={() => abrirTelefono(centroSeleccionado.telefono)}>
                <Text style={styles.panelIcono}>📞</Text>
                <Text style={[styles.panelTexto, styles.panelEnlace]}>{centroSeleccionado.telefono}</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={[styles.botonResena, { borderColor: color }]} onPress={abrirModal}>
              <Text style={[styles.botonResenaTexto, { color }]}>⭐ Dejar reseña</Text>
            </TouchableOpacity>
            {centroSeleccionado.web && centroSeleccionado.web !== '-' ? (
              <TouchableOpacity style={[styles.botonWeb, { backgroundColor: color }]} onPress={() => abrirWeb(centroSeleccionado.web)}>
                <Text style={styles.botonWebTexto}>🌐  Visitar página web</Text>
              </TouchableOpacity>
            ) : null}
            <View style={{ height: 20 }} />
          </ScrollView>
        </Animated.View>
      )}

      {/* MODAL RESEÑA */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={cerrarModal}>
        <View style={styles.modalFondo}>
          <View style={styles.modalCaja}>

            {/* ELEGIR PERFIL */}
            {pasoModal === 'elegir' && (
              <>
                <Text style={styles.modalTitulo}>¿Quién eres?</Text>
                <Text style={styles.modalSubtitulo}>Elige tu perfil para responder</Text>
                <View style={styles.elegirFila}>
                  <TouchableOpacity style={styles.elegirBoton} onPress={() => setPasoModal('nino')}>
                    <Text style={styles.elegirEmoji}>👤</Text>
                    <Text style={styles.elegirTexto}>Persona menor</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.elegirBoton} onPress={() => setPasoModal('adulto')}>
                    <Text style={styles.elegirEmoji}>👤</Text>
                    <Text style={styles.elegirTexto}>Persona adulta</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={cerrarModal}>
                  <Text style={styles.modalCancelar}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}

            {/* FORMULARIO NIÑO */}
            {pasoModal === 'nino' && (
              <>
                <Text style={styles.modalTitulo}>👤 ¡Tu opinión importa!</Text>
                <Text style={styles.modalPregunta}>¿Como te han atendido aqui?</Text>
                <View style={styles.caritasFila}>
                  {[
                    { val: 3, Svg: FelicidadSvg, texto: '¡Bien!' },
                    { val: 2, Svg: NeutroSvg, texto: 'Más o menos' },
                    { val: 1, Svg: TristeSvg, texto: 'Mal' },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.val}
                      style={[styles.caritaBoton, valoracionNino === item.val && styles.caritaSeleccionada]}
                      onPress={() => setValoracionNino(item.val)}
                    >
                      <Image source={item.Svg} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
                      <Text style={styles.caritaTexto}>{item.texto}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={[styles.botonEnviar, !valoracionNino && styles.botonEnviarDesactivado]}
                  onPress={enviarResenaНino}
                  disabled={!valoracionNino || enviando}
                >
                  <Text style={styles.botonEnviarTexto}>{enviando ? 'Enviando...' : '¡Enviar mi opinión!'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPasoModal('elegir')}>
                  <Text style={styles.modalCancelar}>← Volver</Text>
                </TouchableOpacity>
              </>
            )}

            {/* FORMULARIO ADULTO */}
            {pasoModal === 'adulto' && (
              <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                <Text style={styles.modalTitulo}>👤 Tu opinión</Text>
                <Text style={styles.modalSubtitulo}>Sobre la atención recibida en {centroSeleccionado?.nombre}</Text>

                {/* P3 */}
                <Text style={styles.pregunta}>1. ¿Te han atendido de forma correcta y respetuosa?</Text>
                {['Sí', 'No', 'Parcialmente'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p3 === op && styles.opcionSeleccionada]} onPress={() => setRespAdulto(p => ({ ...p, p3: op }))}>
                    <Text style={[styles.opcionTexto, respAdulto.p3 === op && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}

                {/* P4 */}
                <Text style={styles.pregunta}>2. ¿Te has sentido escuchada/o durante la atención?</Text>
                {['Sí, en todo momento', 'En parte', 'No'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p4 === op && styles.opcionSeleccionada]} onPress={() => setRespAdulto(p => ({ ...p, p4: op }))}>
                    <Text style={[styles.opcionTexto, respAdulto.p4 === op && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}

                {/* P5 */}
                <Text style={styles.pregunta}>3. ¿Te han explicado claramente qué iban a hacer y cuáles eran tus opciones?</Text>
                {['Sí', 'No', 'Solo en parte'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p5 === op && styles.opcionSeleccionada]} onPress={() => setRespAdulto(p => ({ ...p, p5: op }))}>
                    <Text style={[styles.opcionTexto, respAdulto.p5 === op && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}

                {/* P6 */}
                <Text style={styles.pregunta}>4. ¿Han intentado comunicarse contigo en un idioma que entiendes?</Text>
                {['Sí', 'No', 'No lo necesitaba'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p6 === op && styles.opcionSeleccionada]} onPress={() => setRespAdulto(p => ({ ...p, p6: op }))}>
                    <Text style={[styles.opcionTexto, respAdulto.p6 === op && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}

                {/* P7 - Multiopción */}
                <Text style={styles.pregunta}>5. ¿Has sentido algún tipo de violencia? (Marca todas las que correspondan)</Text>
                {['Ninguna', 'Violencia verbal', 'Violencia psicológica o emocional', 'Discriminación', 'Violencia física', 'Negligencia o dejadez', 'Otra'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p7.includes(op) && styles.opcionSeleccionada]} onPress={() => toggleP7(op)}>
                    <Text style={[styles.opcionTexto, respAdulto.p7.includes(op) && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}
                {respAdulto.p7.includes('Otra') && (
                  <TextInput
                    style={styles.inputAbierto}
                    placeholder="¿Cuál?"
                    value={respAdulto.p7_otro}
                    onChangeText={t => setRespAdulto(p => ({ ...p, p7_otro: t }))}
                  />
                )}

                {/* P8 */}
                <Text style={styles.pregunta}>6. ¿Han tenido en cuenta tus necesidades personales o familiares?</Text>
                {['Sí', 'No', 'Parcialmente', 'No era necesario en mi caso'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p8 === op && styles.opcionSeleccionada]} onPress={() => setRespAdulto(p => ({ ...p, p8: op }))}>
                    <Text style={[styles.opcionTexto, respAdulto.p8 === op && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}

                {/* P9 */}
                <Text style={styles.pregunta}>7. En general, ¿cómo valorarías la calidad de la atención recibida?</Text>
                {['Muy buena', 'Buena', 'Regular', 'Mala', 'Muy mala'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p9 === op && styles.opcionSeleccionada]} onPress={() => setRespAdulto(p => ({ ...p, p9: op }))}>
                    <Text style={[styles.opcionTexto, respAdulto.p9 === op && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}

                {/* P10 */}
                <Text style={styles.pregunta}>8. ¿Volverías a acudir a este centro si lo necesitaras?</Text>
                {['Sí', 'No', 'No lo sé'].map(op => (
                  <TouchableOpacity key={op} style={[styles.opcion, respAdulto.p10 === op && styles.opcionSeleccionada]} onPress={() => setRespAdulto(p => ({ ...p, p10: op }))}>
                    <Text style={[styles.opcionTexto, respAdulto.p10 === op && styles.opcionTextoSel]}>{op}</Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={[styles.botonEnviar, !adultoCompleto && styles.botonEnviarDesactivado]}
                  onPress={enviarResenaAdulto}
                  disabled={!adultoCompleto || enviando}
                >
                  <Text style={styles.botonEnviarTexto}>{enviando ? 'Enviando...' : 'Enviar valoración'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPasoModal('elegir')}>
                  <Text style={[styles.modalCancelar, { marginBottom: 20 }]}>← Volver</Text>
                </TouchableOpacity>
              </ScrollView>
            )}

            {/* GRACIAS */}
            {pasoModal === 'gracias' && (
              <>
                <Text style={styles.graciasEmoji}>🎉</Text>
                <Text style={styles.modalTitulo}>¡Gracias!</Text>
                <Text style={styles.modalSubtitulo}>Tu opinión ayuda a mejorar el barrio</Text>
                <TouchableOpacity style={styles.botonEnviar} onPress={cerrarModal}>
                  <Text style={styles.botonEnviarTexto}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { width: '100%', height: '100%' },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  textoInfo: { marginTop: 12, fontSize: 16, color: '#555' },
  textoError: { fontSize: 16, color: '#E53935', textAlign: 'center', lineHeight: 26 },
  panel: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30, maxHeight: '60%',
    shadowColor: '#000', shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15, shadowRadius: 10, elevation: 20,
  },
  panelBarra: { height: 4, width: 40, borderRadius: 2, alignSelf: 'center', marginBottom: 12 },
  botonCerrar: {
    position: 'absolute', top: 12, right: 16, width: 28, height: 28,
    borderRadius: 14, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center',
  },
  botonCerrarTexto: { fontSize: 12, color: '#555' },
  panelCategoria: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  panelNombre: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 8, paddingRight: 30 },
  panelDescripcion: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 12 },
  panelFila: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  panelIcono: { fontSize: 16, marginRight: 8, marginTop: 1 },
  panelTexto: { fontSize: 14, color: '#333', flex: 1, lineHeight: 20 },
  panelEnlace: { color: '#1E88E5' },
  botonResena: { marginTop: 12, padding: 14, borderRadius: 12, borderWidth: 2, alignItems: 'center' },
  botonResenaTexto: { fontWeight: '700', fontSize: 15 },
  botonWeb: { marginTop: 10, padding: 14, borderRadius: 12, alignItems: 'center' },
  botonWebTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  modalFondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCaja: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40, alignItems: 'center', maxHeight: '90%',
  },
  modalTitulo: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 6, textAlign: 'center' },
  modalSubtitulo: { fontSize: 14, color: '#888', marginBottom: 20, textAlign: 'center' },
  modalPregunta: { fontSize: 17, fontWeight: '600', color: '#222', marginBottom: 20, textAlign: 'center', lineHeight: 24 },
  modalCancelar: { marginTop: 16, fontSize: 14, color: '#888', textAlign: 'center' },
  elegirFila: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  elegirBoton: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 16, padding: 20, alignItems: 'center' },
  elegirEmoji: { fontSize: 40, marginBottom: 8 },
  elegirTexto: { fontSize: 16, fontWeight: '700', color: '#333' },
  caritasFila: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  caritaBoton: {
    flex: 1, backgroundColor: '#f5f5f5', borderRadius: 16,
    padding: 12, alignItems: 'center', borderWidth: 2, borderColor: 'transparent',
  },
  caritaSeleccionada: { borderColor: '#333', backgroundColor: '#fff' },
  caritaTexto: { fontSize: 11, fontWeight: '600', color: '#333', textAlign: 'center', marginTop: 6 },
  pregunta: { fontSize: 14, fontWeight: '700', color: '#222', marginTop: 16, marginBottom: 8, width: '100%' },
  opcion: {
    width: '100%', padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5',
    marginBottom: 6, borderWidth: 1, borderColor: '#eee',
  },
  opcionSeleccionada: { backgroundColor: '#333', borderColor: '#333' },
  opcionTexto: { fontSize: 14, color: '#333' },
  opcionTextoSel: { color: '#fff', fontWeight: '600' },
  inputAbierto: {
    width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    padding: 12, fontSize: 14, marginBottom: 6, color: '#333',
  },
  botonEnviar: { backgroundColor: '#333', padding: 16, borderRadius: 14, width: '100%', alignItems: 'center', marginTop: 16 },
  botonEnviarDesactivado: { backgroundColor: '#ccc' },
  botonEnviarTexto: { color: '#fff', fontWeight: '700', fontSize: 16 },
  graciasEmoji: { fontSize: 56, marginBottom: 12 },
  filtrosContainer: {
    position: 'absolute', top: 50, left: 0, right: 0, zIndex: 10,
  },
  filtrosContent: {
    paddingHorizontal: 12, gap: 8, flexDirection: 'row',
  },
  filtroChip: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
    borderWidth: 2, backgroundColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  filtroTexto: {
    fontSize: 12, fontWeight: '700',
  },
  botonFlotante: {
    position: 'absolute', bottom: 20, alignSelf: 'center',
    backgroundColor: '#333', paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: 30, zIndex: 5,
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, elevation: 8,
  },
  botonFlotanteTexto: {
    color: '#fff', fontWeight: '800', fontSize: 16,
  },
});