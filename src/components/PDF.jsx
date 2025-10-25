import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'

Font.register({
  family: 'Times-Roman',
  src: 'https://fonts.cdnfonts.com/s/18683/TimesNewRoman.woff',
})

// === ESTILOS ===
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#000',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  notes: {
    fontSize: 10,
    color: '#555',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 5,
  },
})

// === FUNCIÓN AUXILIAR ===
const groupIntentionsByType = (intentions) => {
  const groups = {}
  intentions.forEach((i) => {
    if (!groups[i.tipo]) groups[i.tipo] = []
    groups[i.tipo].push(i)
  })
  return groups
}

// === COMPONENTE PRINCIPAL ===
export const PDF = ({ intentions = [], event = {} }) => {
  const grouped = groupIntentionsByType(intentions)

  // Fecha legible
  const date = new Date(event.fecha_ini)
  const fechaFormateada = date.toLocaleDateString('es-GT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const hora = date.toLocaleTimeString('es-GT', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Intenciones para la {event.nombre}</Text>
          <Text style={styles.subtitle}>
            Iglesia Catolica de Zunilito Suchitepéquez
          </Text>
          <Text style={styles.subtitle}>
            {fechaFormateada}, {hora}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Cuerpo agrupado por tipo */}
        {Object.entries(grouped).map(([tipo, list]) => (
          <View key={tipo}>
            <Text style={styles.sectionTitle}>
              {tipo === 'Por difuntos'
                ? 'Por los Fieles Difuntos:'
                : tipo === 'Por Salud'
                  ? 'Por la Salud de los Enfermos:'
                  : tipo === 'De Acción de Gracias'
                    ? 'En Acción de Gracias:'
                    : tipo + ':'}
            </Text>

            {list.map((item) => (
              <View key={item.id_intencion} style={styles.listItem}>
                <Text>
                  •{' '}
                  {item.descripcion.trim().endsWith('.')
                    ? item.descripcion
                    : item.descripcion + '.'}{' '}
                  <Text>
                    (a petición de{' '}
                    <Text style={styles.bold}>{item.feligres}</Text>
                    {item.solicitud
                      ? `, solicitado el ${new Date(item.solicitud).toLocaleDateString('es-GT')}`
                      : ''}
                    ).
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        ))}

        {/* Pie de página */}
        <View style={styles.notes}>
          <Text>
            Total de intenciones para esta celebración: {intentions.length}.
          </Text>
          <Text>
            Este documento fue generado automáticamente por el sistema de
            gestión parroquial de zunilito
          </Text>
        </View>
      </Page>
    </Document>
  )
}
