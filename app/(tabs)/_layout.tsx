import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import PantallaBienvenida from '../../components/SplashScreen';

const TESTIMONIOS_URL = 'https://noubarris-backend.onrender.com/api/testimonios';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [mostrarSplash, setMostrarSplash] = useState(true);

  const enviar = async () => {
    if (!texto.trim()) return;
    setEnviando(true);
    try {
      await fetch(TESTIMONIOS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });
      setEnviado(true);
      setTexto('');
    } catch (e) {
      console.error(e);
    } finally {
      setEnviando(false);
    }
  };

  const cerrar = () => {
    setModalVisible(false);
    setEnviado(false);
    setTexto('');
  };

  if (mostrarSplash) {
    return <PantallaBienvenida onFinish={() => setMostrarSplash(false)} />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="bitacora"
          options={{
            title: 'Bitácora',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Mapa',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="aprende"
          options={{
            title: 'Aprende',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cuento"
          options={{
            title: 'Cuento contigo',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="bubble.left.fill" color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={() => setModalVisible(true)} />
            ),
          }}
        />
      </Tabs>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={cerrar}>
        <View style={styles.fondo}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.caja}
          >
            {enviado ? (
              <>
                <Text style={styles.graciasEmoji}>💬</Text>
                <Text style={styles.titulo}>¡Gracias por contárnoslo!</Text>
                <Text style={styles.subtitulo}>Tu experiencia nos ayuda a mejorar</Text>
                <TouchableOpacity style={styles.botonEnviar} onPress={cerrar}>
                  <Text style={styles.botonTexto}>Cerrar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.titulo}>Cuento contigo</Text>
                <Text style={styles.subtitulo}>
                  "Si has asistido a este centro de atención, cuéntanos tu experiencia"
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí tu experiencia..."
                  placeholderTextColor="#aaa"
                  multiline
                  numberOfLines={6}
                  value={texto}
                  onChangeText={setTexto}
                />
                <TouchableOpacity
                  style={[styles.botonEnviar, !texto.trim() && styles.botonDesactivado]}
                  onPress={enviar}
                  disabled={!texto.trim() || enviando}
                >
                  <Text style={styles.botonTexto}>{enviando ? 'Enviando...' : 'Enviar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cerrar}>
                  <Text style={styles.cancelar}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  caja: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 48, alignItems: 'center',
  },
  graciasEmoji: { fontSize: 48, marginBottom: 12 },
  titulo: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 8, textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#888', marginBottom: 20, textAlign: 'center', lineHeight: 20 },
  input: {
    width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 14,
    padding: 14, fontSize: 15, color: '#333', textAlignVertical: 'top',
    minHeight: 120, marginBottom: 16,
  },
  botonEnviar: {
    backgroundColor: '#333', padding: 16, borderRadius: 14,
    width: '100%', alignItems: 'center', marginBottom: 8,
  },
  botonDesactivado: { backgroundColor: '#ccc' },
  botonTexto: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cancelar: { fontSize: 14, color: '#888', marginTop: 8 },
});
