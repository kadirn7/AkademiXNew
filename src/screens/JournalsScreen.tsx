import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

interface Journal {
  name: string;
  website: string;
  impact: number;
  publisher: string;
}

interface JournalCategory {
  name: string;
  q1: Journal[];
  q2: Journal[];
  q3: Journal[];
  q4: Journal[];
}

const JournalsScreen = () => {
  const [selectedField, setSelectedField] = useState('Sosyal Bilimler');
  const [selectedQ, setSelectedQ] = useState<string | null>(null);

  const fields = [
    'Sosyal Bilimler',
    'Sağlık Bilimleri', 
    'Mühendislik',
    'Tıp',
    'Doğa Bilimleri',
    'Ekonomi'
  ];

  const journals: JournalCategory[] = [
    {
      name: 'Sosyal Bilimler',
      q1: [
        { name: 'Journal of Social Psychology', website: 'www.socialpsych.com', impact: 3.2, publisher: 'Sage Publications' },
        { name: 'Social Science Research', website: 'www.socscires.org', impact: 2.8, publisher: 'Elsevier' },
        { name: 'American Sociological Review', website: 'www.asr.org', impact: 4.1, publisher: 'American Sociological Association' },
        { name: 'Journal of Personality and Social Psychology', website: 'www.psycnet.apa.org', impact: 5.2, publisher: 'American Psychological Association' },
      ],
      q2: [
        { name: 'Social Psychology Quarterly', website: 'www.spq.org', impact: 2.1, publisher: 'Sage Publications' },
        { name: 'Journal of Applied Social Psychology', website: 'www.appliedsocialpsych.com', impact: 1.8, publisher: 'Wiley' },
        { name: 'Social Forces', website: 'www.socialforces.org', impact: 2.3, publisher: 'Oxford University Press' },
      ],
      q3: [
        { name: 'Social Science Quarterly', website: 'www.ssq.org', impact: 1.2, publisher: 'Wiley' },
        { name: 'Journal of Social Issues', website: 'www.jsi.org', impact: 1.5, publisher: 'Wiley' },
      ],
      q4: [
        { name: 'Social Studies Research', website: 'www.socialstudies.org', impact: 0.8, publisher: 'Local Press' },
        { name: 'Contemporary Social Science', website: 'www.contemporarysocial.org', impact: 0.9, publisher: 'Routledge' },
      ]
    },
    {
      name: 'Sağlık Bilimleri',
      q1: [
        { name: 'The Lancet', website: 'www.thelancet.com', impact: 59.1, publisher: 'Elsevier' },
        { name: 'New England Journal of Medicine', website: 'www.nejm.org', impact: 74.7, publisher: 'Massachusetts Medical Society' },
        { name: 'JAMA', website: 'www.jama.com', impact: 56.3, publisher: 'American Medical Association' },
        { name: 'BMJ', website: 'www.bmj.com', impact: 39.9, publisher: 'BMJ Publishing Group' },
      ],
      q2: [
        { name: 'Health Psychology', website: 'www.healthpsychology.org', impact: 3.2, publisher: 'American Psychological Association' },
        { name: 'Social Science & Medicine', website: 'www.socialsciencemedicine.com', impact: 4.6, publisher: 'Elsevier' },
        { name: 'Journal of Health and Social Behavior', website: 'www.jhsb.org', impact: 2.8, publisher: 'Sage Publications' },
      ],
      q3: [
        { name: 'Health Education Research', website: 'www.her.org', impact: 1.8, publisher: 'Oxford University Press' },
        { name: 'Journal of Health Psychology', website: 'www.healthpsychology.com', impact: 2.1, publisher: 'Sage Publications' },
      ],
      q4: [
        { name: 'Health Science Journal', website: 'www.healthscience.org', impact: 0.7, publisher: 'Local Health Press' },
        { name: 'Contemporary Health Studies', website: 'www.contemporaryhealth.org', impact: 0.9, publisher: 'Academic Press' },
      ]
    },
    {
      name: 'Mühendislik',
      q1: [
        { name: 'Nature', website: 'www.nature.com', impact: 49.9, publisher: 'Springer Nature' },
        { name: 'Science', website: 'www.science.org', impact: 47.7, publisher: 'American Association for the Advancement of Science' },
        { name: 'IEEE Transactions on Pattern Analysis and Machine Intelligence', website: 'www.ieee.org', impact: 17.9, publisher: 'IEEE' },
        { name: 'Advanced Materials', website: 'www.advancedmaterials.com', impact: 32.1, publisher: 'Wiley' },
      ],
      q2: [
        { name: 'IEEE Transactions on Neural Networks', website: 'www.ieee.org', impact: 8.2, publisher: 'IEEE' },
        { name: 'Journal of Materials Science', website: 'www.materialsscience.org', impact: 4.1, publisher: 'Springer' },
        { name: 'Computer Vision and Image Understanding', website: 'www.cviu.org', impact: 4.8, publisher: 'Elsevier' },
      ],
      q3: [
        { name: 'Engineering Applications', website: 'www.engineeringapps.org', impact: 2.1, publisher: 'Engineering Press' },
        { name: 'Journal of Engineering Research', website: 'www.engineeringresearch.org', impact: 1.8, publisher: 'Academic Press' },
      ],
      q4: [
        { name: 'Basic Engineering Studies', website: 'www.basicengineering.org', impact: 0.6, publisher: 'Local Engineering Press' },
        { name: 'Contemporary Engineering', website: 'www.contemporaryengineering.org', impact: 0.8, publisher: 'Engineering Publications' },
      ]
    },
    {
      name: 'Tıp',
      q1: [
        { name: 'Cell', website: 'www.cell.com', impact: 66.8, publisher: 'Cell Press' },
        { name: 'Nature Medicine', website: 'www.nature.com/medicine', impact: 87.2, publisher: 'Springer Nature' },
        { name: 'Science Translational Medicine', website: 'www.sciencetranslationalmedicine.org', impact: 17.9, publisher: 'AAAS' },
        { name: 'The New England Journal of Medicine', website: 'www.nejm.org', impact: 74.7, publisher: 'Massachusetts Medical Society' },
      ],
      q2: [
        { name: 'Journal of Clinical Investigation', website: 'www.jci.org', impact: 15.4, publisher: 'American Society for Clinical Investigation' },
        { name: 'Nature Reviews Drug Discovery', website: 'www.nature.com/nrd', impact: 84.7, publisher: 'Springer Nature' },
        { name: 'Cell Reports Medicine', website: 'www.cellreportsmedicine.com', impact: 16.6, publisher: 'Cell Press' },
      ],
      q3: [
        { name: 'Medical Research Reviews', website: 'www.medicalresearch.org', impact: 8.9, publisher: 'Wiley' },
        { name: 'Journal of Medical Research', website: 'www.medicalresearch.com', impact: 6.2, publisher: 'Academic Press' },
      ],
      q4: [
        { name: 'Basic Medical Studies', website: 'www.basicmedical.org', impact: 1.2, publisher: 'Local Medical Press' },
        { name: 'Contemporary Medical Research', website: 'www.contemporarymedical.org', impact: 1.8, publisher: 'Medical Publications' },
      ]
    },
    {
      name: 'Doğa Bilimleri',
      q1: [
        { name: 'Nature', website: 'www.nature.com', impact: 49.9, publisher: 'Springer Nature' },
        { name: 'Science', website: 'www.science.org', impact: 47.7, publisher: 'AAAS' },
        { name: 'Physical Review Letters', website: 'www.physrevlett.org', impact: 9.2, publisher: 'American Physical Society' },
        { name: 'Chemical Reviews', website: 'www.chemreviews.org', impact: 72.1, publisher: 'American Chemical Society' },
      ],
      q2: [
        { name: 'Journal of Physical Chemistry', website: 'www.jpc.org', impact: 4.2, publisher: 'American Chemical Society' },
        { name: 'Nature Chemistry', website: 'www.nature.com/nchem', impact: 24.4, publisher: 'Springer Nature' },
        { name: 'Angewandte Chemie', website: 'www.angewandte.org', impact: 16.8, publisher: 'Wiley' },
      ],
      q3: [
        { name: 'Chemistry Research', website: 'www.chemistryresearch.org', impact: 2.8, publisher: 'Chemistry Press' },
        { name: 'Journal of Natural Sciences', website: 'www.naturalsciences.org', impact: 2.1, publisher: 'Academic Press' },
      ],
      q4: [
        { name: 'Basic Science Studies', website: 'www.basicscience.org', impact: 0.9, publisher: 'Local Science Press' },
        { name: 'Contemporary Natural Sciences', website: 'www.contemporaryscience.org', impact: 1.1, publisher: 'Science Publications' },
      ]
    },
    {
      name: 'Ekonomi',
      q1: [
        { name: 'American Economic Review', website: 'www.aeaweb.org/aer', impact: 8.5, publisher: 'American Economic Association' },
        { name: 'Quarterly Journal of Economics', website: 'www.qje.org', impact: 7.8, publisher: 'Oxford University Press' },
        { name: 'Journal of Political Economy', website: 'www.jpe.org', impact: 6.2, publisher: 'University of Chicago Press' },
        { name: 'Econometrica', website: 'www.econometrica.org', impact: 6.1, publisher: 'Wiley' },
      ],
      q2: [
        { name: 'Journal of Economic Literature', website: 'www.jel.org', impact: 4.8, publisher: 'American Economic Association' },
        { name: 'Review of Economic Studies', website: 'www.restud.org', impact: 4.2, publisher: 'Oxford University Press' },
        { name: 'Economic Journal', website: 'www.economicjournal.org', impact: 3.9, publisher: 'Royal Economic Society' },
      ],
      q3: [
        { name: 'Economics Research', website: 'www.economicsresearch.org', impact: 2.1, publisher: 'Economics Press' },
        { name: 'Journal of Economic Studies', website: 'www.economicstudies.org', impact: 1.8, publisher: 'Academic Press' },
      ],
      q4: [
        { name: 'Basic Economic Studies', website: 'www.basiceconomics.org', impact: 0.7, publisher: 'Local Economics Press' },
        { name: 'Contemporary Economics', website: 'www.contemporaryeconomics.org', impact: 0.9, publisher: 'Economics Publications' },
      ]
    }
  ];

  const getQColor = (q: string): string => {
    switch (q) {
      case 'Q1': return '#4CAF50';
      case 'Q2': return '#FF9800';
      case 'Q3': return '#FF5722';
      case 'Q4': return '#F44336';
      default: return '#999';
    }
  };

  const getCurrentJournals = () => {
    const currentField = journals.find(j => j.name === selectedField);
    if (!currentField) return [];
    
    if (selectedQ === 'Q1') return currentField.q1;
    if (selectedQ === 'Q2') return currentField.q2;
    if (selectedQ === 'Q3') return currentField.q3;
    if (selectedQ === 'Q4') return currentField.q4;
    
    return [];
  };

  const renderJournalItem = ({ item }: { item: Journal }) => (
    <View style={styles.journalItem}>
      <View style={styles.journalInfo}>
        <Text style={styles.journalName}>{item.name}</Text>
        <Text style={styles.journalPublisher}>{item.publisher}</Text>
        <Text style={styles.journalWebsite}>{item.website}</Text>
      </View>
      <View style={styles.journalImpact}>
        <Text style={styles.impactLabel}>Impact Factor</Text>
        <Text style={styles.impactValue}>{item.impact}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dergiler</Text>
        <Text style={styles.headerSubtitle}>Uluslararası Q1-Q4 dergileri</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.fieldsSection}>
          <Text style={styles.sectionTitle}>Akademik Alanlar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fieldsScroll}>
            {fields.map((field) => (
              <TouchableOpacity
                key={field}
                style={[
                  styles.fieldButton,
                  selectedField === field && styles.fieldButtonActive
                ]}
                onPress={() => {
                  setSelectedField(field);
                  setSelectedQ(null);
                }}
              >
                <Text style={[
                  styles.fieldButtonText,
                  selectedField === field && styles.fieldButtonTextActive
                ]}>
                  {field}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedField && (
          <View style={styles.qSection}>
            <Text style={styles.sectionTitle}>{selectedField} - Dergi Kategorileri</Text>
            <View style={styles.qButtons}>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                <TouchableOpacity
                  key={q}
                  style={[
                    styles.qButton,
                    { backgroundColor: getQColor(q) },
                    selectedQ === q && styles.qButtonActive
                  ]}
                  onPress={() => setSelectedQ(selectedQ === q ? null : q)}
                >
                  <Text style={styles.qButtonText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedQ && (
          <View style={styles.journalsSection}>
            <Text style={styles.sectionTitle}>
              {selectedField} - {selectedQ} Dergileri
            </Text>
            <FlatList
              data={getCurrentJournals()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderJournalItem}
              scrollEnabled={false}
            />
          </View>
        )}

        {!selectedQ && selectedField && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Dergi Kategorileri</Text>
            <Text style={styles.infoText}>
              Bir kategori seçin (Q1, Q2, Q3, Q4) o alandaki dergileri görmek için.
            </Text>
            <View style={styles.qInfo}>
              <View style={styles.qInfoItem}>
                <View style={[styles.qInfoColor, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.qInfoText}>Q1: En yüksek etki faktörü</Text>
              </View>
              <View style={styles.qInfoItem}>
                <View style={[styles.qInfoColor, { backgroundColor: '#FF9800' }]} />
                <Text style={styles.qInfoText}>Q2: Yüksek etki faktörü</Text>
              </View>
              <View style={styles.qInfoItem}>
                <View style={[styles.qInfoColor, { backgroundColor: '#FF5722' }]} />
                <Text style={styles.qInfoText}>Q3: Orta etki faktörü</Text>
              </View>
              <View style={styles.qInfoItem}>
                <View style={[styles.qInfoColor, { backgroundColor: '#F44336' }]} />
                <Text style={styles.qInfoText}>Q4: Düşük etki faktörü</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  fieldsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  fieldsScroll: {
    marginBottom: 10,
  },
  fieldButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fieldButtonActive: {
    backgroundColor: '#2196F3',
  },
  fieldButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  fieldButtonTextActive: {
    color: 'white',
  },
  qSection: {
    marginBottom: 25,
  },
  qButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  qButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  qButtonActive: {
    transform: [{ scale: 1.1 }],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  qButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  journalsSection: {
    marginBottom: 20,
  },
  journalItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  journalInfo: {
    flex: 1,
  },
  journalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  journalPublisher: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  journalWebsite: {
    fontSize: 11,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  journalImpact: {
    alignItems: 'flex-end',
  },
  impactLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  impactValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  qInfo: {
    marginTop: 10,
  },
  qInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  qInfoColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  qInfoText: {
    fontSize: 12,
    color: '#666',
  },
});

export default JournalsScreen; 