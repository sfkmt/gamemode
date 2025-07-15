# GAME MODE Extension インストールガイド

## 方法1: 開発者モードで使用（推奨）

### 1. 拡張機能をビルド
```bash
cd /path/to/game-mode-extension
npm install
npm run compile
```

### 2. Cursorで拡張機能フォルダを開く
```bash
# Cursorで直接開く
cursor /path/to/game-mode-extension

# または、Finderから開く
open -a Cursor /path/to/game-mode-extension
```

### 3. F5キーでデバッグ実行
- F5キーを押すと新しいCursorウィンドウが開きます
- このウィンドウでGAME MODEが使用可能です

### 4. GAME MODEをアクティベート
- コマンドパレット（Cmd/Ctrl + Shift + P）を開く
- 「GAME MODE: Activate GAME MODE」を実行
- または、Cmd/Ctrl + Shift + G のショートカットを使用

## 方法2: VSIXパッケージを作成してインストール

### 1. 必要なツールをインストール
```bash
npm install -g @vscode/vsce
```

### 2. VSIXパッケージを作成
```bash
cd /path/to/game-mode-extension
vsce package
```

### 3. Cursorにインストール
- Cursorを開く
- コマンドパレット（Cmd/Ctrl + Shift + P）を開く
- 「Extensions: Install from VSIX...」を選択
- 作成した`.vsix`ファイルを選択

## 方法3: シンボリックリンクで直接インストール

### macOSの場合
```bash
# Cursor拡張機能フォルダにシンボリックリンクを作成
ln -s "/path/to/game-mode-extension" "$HOME/.cursor/extensions/game-mode-theme"
```

### Windowsの場合（管理者権限で実行）
```cmd
mklink /D "%USERPROFILE%\.cursor\extensions\game-mode-theme" "C:\path\to\game-mode-extension"
```

### Linuxの場合
```bash
ln -s /path/to/game-mode-extension ~/.cursor/extensions/game-mode-theme
```

インストール後、Cursorを再起動してください。

## 使用方法

### テーマの適用
1. コマンドパレットで「GAME MODE: Activate GAME MODE」を実行
2. または、設定から手動で選択：
   - Cmd/Ctrl + K → Cmd/Ctrl + T
   - 「GAME MODE」を選択

### Matrix エフェクトの表示
- Cmd/Ctrl + Shift + M
- または、コマンドパレットで「GAME MODE: Toggle Matrix Effect」

### ネットワークビューの確認
- エクスプローラーサイドバーの下部に「GAME MODE Network」が表示されます
- ノードのステータスと接続数が確認できます

## トラブルシューティング

### 拡張機能が表示されない場合
1. Cursorを完全に再起動
2. 拡張機能ビューで「GAME MODE」を検索
3. 「Enable」ボタンをクリック

### テーマが適用されない場合
1. 他のテーマが上書きしていないか確認
2. 設定で`workbench.colorTheme`が「GAME MODE」になっているか確認

### パフォーマンスの問題
設定でアニメーションを調整：
- `gameMode.animationSpeed`: 0.1（遅い）〜 3.0（速い）
- `gameMode.matrixEffect`: false でMatrixエフェクトを無効化

## アンインストール

### 開発モードの場合
- デバッグウィンドウを閉じるだけ

### VSIXインストールの場合
- 拡張機能ビューで「GAME MODE」を右クリック
- 「Uninstall」を選択

### シンボリックリンクの場合
```bash
# macOS/Linux
rm ~/.cursor/extensions/game-mode-theme

# Windows
rmdir "%USERPROFILE%\.cursor\extensions\game-mode-theme"
```