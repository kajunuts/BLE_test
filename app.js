// ボタンの取得
const connectButton = document.getElementById('connect');
const outputDiv = document.getElementById('output');

// 接続ボタンがクリックされたときにBluetoothデバイスに接続する
connectButton.addEventListener('click', async () => {
  try {
    // デバイスを検索
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
    });

    // GATTサーバに接続
    const server = await device.gatt.connect();

    // 指定されたサービスを取得
    const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');

    // 複数のキャラクタリスティックを取得
    const characteristic1 = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
    const characteristic2 = await service.getCharacteristic('d15c084a-1275-4181-9648-0400ec48104a');

    // 値を読み取る
    const value1 = await characteristic1.readValue();
    const value2 = await characteristic2.readValue();

    // DataViewを使って値を処理
    const value1Array = new Uint8Array(value1.buffer);
    const value2Array = new Uint8Array(value2.buffer);

    // 値をログで確認
    console.log("Characteristic 1 raw value:", value1Array);
    console.log("Characteristic 2 raw value:", value2Array);

    // データを文字列にデコードしようとする
    const textDecoder = new TextDecoder('utf-8');
    let value1String, value2String;

    try {
      value1String = textDecoder.decode(value1Array);
    } catch (e) {
      value1String = "Failed to decode as text";
    }

    try {
      value2String = textDecoder.decode(value2Array);
    } catch (e) {
      value2String = "Failed to decode as text";
    }

    // 結果を表示
    outputDiv.innerHTML = `
      <p>Characteristic 1 Raw Value: ${value1Array}</p>
      <p>Characteristic 1 Decoded Value (String): ${value1String}</p>
      <p>Characteristic 2 Raw Value: ${value2Array}</p>
      <p>Characteristic 2 Decoded Value (String): ${value2String}</p>
    `;
  } catch (error) {
    console.log('Error:', error);
    outputDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
