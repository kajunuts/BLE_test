// ボタンの取得
const connectButton = document.getElementById('connect');
const outputDiv = document.getElementById('output');

// 接続ボタンがクリックされたときにBluetoothデバイスに接続する
connectButton.addEventListener('click', async () => {
  try {
    // デバイスを検索
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'] }], // サービスのUUIDを指定
      optionalServices: ['beb5483e-36e1-4688-b7f5-ea07361b26a8']
    });

    // GATTサーバに接続
    const server = await device.gatt.connect();

    // 指定されたサービスを取得
    const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');

    // 複数のキャラクタリスティックを取得
    const characteristic1 = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
    const characteristic2 = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');

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
