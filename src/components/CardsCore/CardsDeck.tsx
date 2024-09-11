import { CardDeck } from './CardDeck';

export const CardsDeck = ({ data }: any) => {
  const defaultDeck = [
    {
      id: 1,
      boxName: 'All',
      title: 'Sample Deck',
      description: 'This is a sample deck',
    },
  ];
  return (
    <>
      {data && data.length > 0 ? (
        data.map(({ label, value, desc }) => (
          <CardDeck label={label} key={value} value={value} desc={desc} />
        ))
      ) : defaultDeck && defaultDeck.length > 0 ? (
        <CardDeck
          label={defaultDeck[0].boxName}
          key={defaultDeck[0].id}
          value={defaultDeck[0].boxName}
          desc={defaultDeck[0].description} // Asegúrate de que este campo sea correcto
        />
      ) : (
        <p>No default deck available</p> // Mensaje opcional si `defaultDeck` está vacío
      )}
    </>
  );
};
