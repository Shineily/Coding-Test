export const getData = async () => {
  const url = 'https://api.adminsite.appsinti.com/menu/product';
  const resp = await fetch(url);
  const data = await resp.json();

  // console.log(data);
  const menu = data.map((food) => {
    return {
      id: food.id,
      title: food.translations,
      sub: food.subcategories,
    };
  });
  return menu;
};
