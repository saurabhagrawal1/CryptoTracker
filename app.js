const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var autoUpdate;
form.addEventListener('submit', (e) =>{
    // prevent to refresh the page on submit
    e.preventDefault();

    if(autoUpdate){
        clearTimeout(autoUpdate);
    }
    const ctype = form.elements.coinType.value

    fetchCryptoDetails(ctype)

});

 const fetchCryptoDetails = async(ctype) =>{
    const details = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD}`);
    console.log(details);
    const price = details.data.coin.price;
    const volume = details.data.coin.volume;
    const change = details.data.coin.priceChange1d;
    const marketCap = details.data.coin.marketCap;
    // const totalSupply = details.data.coin.totalSupply;
    const base = details.data.coin.name;
    const target = 'USD';

    console.log(price);

    res.innerHTML = `
        <tr style="background-color:blue; color:white; font-weight:700">
            <td> Property</td>
            <td> Value</td>
        </tr>
        <tr>
            <td>${base}</td>
            <td>${price} ${target}</td>
        </tr>
        <tr>
            <td>Volume</td>
            <td>${volume}</td>
        </tr>
        <tr>
            <td>Change</td>
            <td>${change}</td>
        </tr>
        <tr>
            <td>Market Cap</td>
            <td>${marketCap}</td>
        </tr>
    `
    //for auto refresh the cypto details on every 30 Sec
    autoUpdate = setTimeout(() => fetchCryptoDetails(ctype),30000);
}