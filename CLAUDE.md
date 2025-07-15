# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Cursor用のサイバーパンクマトリックス風テーマ「GAME MODE」を開発するプロジェクトです。

## デザインコンセプト

### ビジュアルスタイル
- **メインカラー**: ネオングリーン (#00ff88) とシアン (#00ffff)
- **背景**: ダークネイビー (#0a0e1a)
- **アクセント**: マゼンタ (#ff00ff) とピンク (#ff0088) for 警告・エラー
- **エフェクト**: Matrix風のテキストフロー、ネットワークビジュアライゼーション

### 実装されたUI要素
1. **カラーテーマ**
   - VS Code/Cursor用の完全なダークテーマ
   - エディタ、サイドバー、ターミナルの配色設定
   - シンタックスハイライトのトークンカラー

2. **ネットワークビジュアライゼーション**
   - Explorer サイドバーに「GAME MODE Network」ビュー
   - ノード状態表示（Active/Critical/Inactive）
   - 接続数の表示

3. **マトリックスエフェクト**
   - Webviewパネルでの全画面エフェクト
   - 16進数文字の降下アニメーション
   - 3Dネットワークノードの可視化

4. **ステータスバー**
   - 「GAME MODE ACTIVE」の回転アニメーション
   - ネットワークステータスのツールチップ表示

## 実装済み機能

### コマンド
1. **Activate GAME MODE** (`gameMode.activateGameMode`)
   - ショートカット: Cmd/Ctrl + Shift + G
   - テーマを「GAME MODE」に切り替え

2. **Toggle Matrix Effect** (`gameMode.toggleMatrix`)
   - ショートカット: Cmd/Ctrl + Shift + M
   - Matrix エフェクトのWebviewパネルを表示/非表示

### 設定オプション
- `gameMode.matrixEffect`: Matrix効果の有効/無効
- `gameMode.glitchEffect`: グリッチエフェクトの有効/無効
- `gameMode.networkVisualization`: ネットワーク表示の有効/無効
- `gameMode.animationSpeed`: アニメーション速度（0.1-3.0）
- `gameMode.neonIntensity`: ネオングローの強度（0.1-1.0）

## ビルドコマンド

```bash
# TypeScriptをコンパイル
npm run compile

# 開発用ウォッチモード
npm run watch

# パブリッシュ準備
npm run vscode:prepublish
```

## アーキテクチャ

### 主要コンポーネント

1. **拡張機能本体 (`src/extension.ts`)**
   - `GameModeProvider`: ネットワークノードのTreeDataProvider実装
   - `GameModeStatusBar`: アニメーション付きステータスバー
   - `MatrixEffect`: Webviewパネルでのビジュアルエフェクト

2. **テーマ (`themes/game-mode-color-theme.json`)**
   - サイバーパンク配色のVS Codeテーマ定義
   - 全UI要素の色設定

3. **マニフェスト (`package.json`)**
   - 拡張機能のメタデータと設定
   - コマンド、ビュー、キーバインディングの定義

## 技術的な注意事項

- **透明度について**: VS Code/Cursorは背景の透明度をサポートしていないため、透明度関連の機能は実装していません
- **パフォーマンス**: アニメーションは`setInterval`と`requestAnimationFrame`を使用して最適化
- **互換性**: VS Code 1.74.0以上で動作

## デバッグ方法

1. F5キーを押してデバッグセッションを開始
2. 新しいVS Code/Cursorウィンドウが開く
3. コマンドパレットから「GAME MODE: Activate GAME MODE」を実行

## 今後の改善案

- WebGLを使用したより高度なビジュアルエフェクト
- Cursor AI機能との統合
- カスタマイズ可能なエフェクトプリセット
- パフォーマンスモードの実装