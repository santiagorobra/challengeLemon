import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
    marginTop: 8
  },
  col: { flex: 1 },
  center: { 
    justifyContent: 'flex-end' 
  },
  label: { 
    marginBottom: 6 
  },
  pill: { 
    paddingVertical: 10 
  },
  inputBlock: { 
    marginTop: 18 
  },
  preview: { 
    marginTop: 18 
  },
});

export default styles;
