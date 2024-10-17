// ボタンの取得
const connectButton = document.getElementById('connect');
const outputDiv = document.getElementById('output');

// 接続ボタンがクリックされたときにBluetoothデバイスに接続する
connectButton.addEventListener('click', async () => {
  try {
    // デバイスを検索
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['your_service_uuid'] }], // サービスのUUIDを指定
      optionalServices: ['your_service_uuid']
    });

    // GATTサーバに接続
    const server = await device.gatt.connect();

    // 指定されたサービスを取得
    const service = await server.getPrimaryService('your_service_uuid');

    // 複数のキャラクタリスティックを取得
    const characteristic1 = await service.getCharacteristic('your_characteristic1_uuid');
    const characteristic2 = await service.getCharacteristic('your_characteristic2_uuid');

    // 値を読み取る
    const value1 = await characteristic1.readValue();
    const value2 = await characteristic2.readValue();

    // DataViewを使って値を処理
    const value1Array = new Uint8Array(value1.buffer);
    const value2Array = new Uint8Array(value2.buffer);

    // 結果を表示
    outputDiv.innerHTML = `
      <p>Characteristic 1 Value: ${value1Array}</p>
      <p>Characteristic 2 Value: ${value2Array}</p>
    `;
  } catch (error) {
    console.log('Error:', error);
    outputDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});