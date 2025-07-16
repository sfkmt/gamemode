import * as vscode from 'vscode';

interface NetworkNode {
    id: string;
    status: 'active' | 'inactive' | 'critical';
    connections: number;
}

class GameModeProvider implements vscode.TreeDataProvider<NetworkNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<NetworkNode | undefined | null | void> = new vscode.EventEmitter<NetworkNode | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<NetworkNode | undefined | null | void> = this._onDidChangeTreeData.event;

    private nodes: NetworkNode[] = [
        { id: 'CORE-001', status: 'active', connections: 42 },
        { id: 'NEURAL-NET', status: 'active', connections: 128 },
        { id: 'SECURITY-LAYER', status: 'critical', connections: 7 },
        { id: 'DATA-STREAM', status: 'active', connections: 256 },
        { id: 'QUANTUM-LINK', status: 'inactive', connections: 0 }
    ];

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: NetworkNode): vscode.TreeItem {
        const item = new vscode.TreeItem(element.id, vscode.TreeItemCollapsibleState.None);
        
        // Status icons
        const statusIcon = element.status === 'active' ? '🟢' : 
                          element.status === 'critical' ? '🔴' : '⚪';
        
        item.label = `${statusIcon} ${element.id}`;
        item.description = `${element.connections} connections`;
        item.tooltip = `Node: ${element.id}\nStatus: ${element.status}\nConnections: ${element.connections}`;
        
        // Different colors for different statuses
        item.iconPath = new vscode.ThemeIcon(
            element.status === 'active' ? 'check' :
            element.status === 'critical' ? 'error' : 'circle-outline',
            new vscode.ThemeColor(
                element.status === 'active' ? 'terminal.ansiGreen' :
                element.status === 'critical' ? 'terminal.ansiRed' : 'terminal.ansiBlue'
            )
        );

        return item;
    }

    getChildren(element?: NetworkNode): Thenable<NetworkNode[]> {
        if (!element) {
            return Promise.resolve(this.nodes);
        }
        return Promise.resolve([]);
    }
}

class GameModeStatusBar {
    private statusBarItem: vscode.StatusBarItem;
    private animationTimer: NodeJS.Timeout | undefined;
    private frames = ['◢', '◣', '◤', '◥'];
    private currentFrame = 0;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.statusBarItem.command = 'gameMode.toggleMatrix';
        this.startAnimation();
    }

    private startAnimation() {
        this.animationTimer = setInterval(() => {
            const frame = this.frames[this.currentFrame];
            this.statusBarItem.text = `$(symbol-misc) GAME MODE ${frame} ACTIVE`;
            this.statusBarItem.color = '#00ff88';
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }, 200);
        this.statusBarItem.show();
    }

    public updateNetworkStatus(activeNodes: number, totalNodes: number) {
        const percentage = Math.round((activeNodes / totalNodes) * 100);
        this.statusBarItem.tooltip = `Network Status: ${activeNodes}/${totalNodes} nodes active (${percentage}%)`;
    }

    dispose() {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }
        this.statusBarItem.dispose();
    }
}

class MatrixEffect {
    private panel: vscode.WebviewPanel | undefined;

    public show() {
        if (this.panel) {
            this.panel.reveal();
            return;
        }

        this.panel = vscode.window.createWebviewPanel(
            'matrixEffect',
            'GAME MODE - Matrix Effect',
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        this.panel.webview.html = this.getWebviewContent();

        this.panel.onDidDispose(() => {
            this.panel = undefined;
        });
    }

    private getWebviewContent(): string {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAME MODE - Matrix Effect</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            overflow: hidden;
            font-family: 'Courier New', monospace;
        }
        
        #matrix-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: radial-gradient(circle, #001122 0%, #000 100%);
        }
        
        #network-viz {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            border: 2px solid #00ff88;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.05) 100%);
            animation: pulse 2s infinite;
        }
        
        .node {
            position: absolute;
            width: 20px;
            height: 20px;
            background: #00ff88;
            border-radius: 50%;
            box-shadow: 0 0 10px #00ff88;
            animation: glow 1s infinite alternate;
        }
        
        .connection {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, #00ff88, transparent);
            animation: flow 3s infinite;
        }
        
        #status-text {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #00ff88;
            font-size: 14px;
            text-shadow: 0 0 5px #00ff88;
        }
        
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes glow {
            0% { box-shadow: 0 0 5px #00ff88; }
            100% { box-shadow: 0 0 20px #00ff88; }
        }
        
        @keyframes flow {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes matrix {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
        
        .matrix-char {
            position: absolute;
            color: #00ff88;
            font-size: 14px;
            text-shadow: 0 0 5px #00ff88;
            animation: matrix 3s linear infinite;
        }
    </style>
</head>
<body>
    <div id="matrix-container">
        <div id="network-viz">
            <div class="node" style="top: 10px; left: 10px;"></div>
            <div class="node" style="top: 50px; right: 20px;"></div>
            <div class="node" style="bottom: 30px; left: 30px;"></div>
            <div class="node" style="bottom: 10px; right: 10px;"></div>
            <div class="node" style="top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
            
            <div class="connection" style="top: 25px; left: 30px; width: 200px; transform: rotate(45deg);"></div>
            <div class="connection" style="top: 150px; left: 50px; width: 150px; transform: rotate(-30deg);"></div>
            <div class="connection" style="bottom: 50px; left: 60px; width: 180px; transform: rotate(15deg);"></div>
        </div>
        
        <div id="status-text">
            <div>GAME MODE STATUS: ACTIVE</div>
            <div>NODES: 5/5 ONLINE</div>
            <div>CONNECTIONS: 1,453</div>
            <div>UPTIME: 1467 DAYS</div>
        </div>
    </div>
    
    <script>
        // Create matrix effect
        function createMatrixChar() {
            const chars = '0123456789ABCDEF';
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDelay = Math.random() * 2 + 's';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.getElementById('matrix-container').appendChild(char);
            
            setTimeout(() => {
                char.remove();
            }, 5000);
        }
        
        // Generate matrix characters
        setInterval(createMatrixChar, 100);
        
        // Update network status
        function updateStatus() {
            const connections = Math.floor(Math.random() * 1000) + 1000;
            const statusText = document.getElementById('status-text');
            statusText.innerHTML = \`
                <div>GAME MODE STATUS: ACTIVE</div>
                <div>NODES: 5/5 ONLINE</div>
                <div>CONNECTIONS: \${connections.toLocaleString()}</div>
                <div>UPTIME: 1467 DAYS</div>
            \`;
        }
        
        setInterval(updateStatus, 2000);
    </script>
</body>
</html>`;
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('GAME MODE Extension is now active!');

    // Initialize components
    const gameProvider = new GameModeProvider();
    const statusBar = new GameModeStatusBar();
    const matrixEffect = new MatrixEffect();

    // Register tree view with error handling
    let treeView: vscode.TreeView<NetworkNode> | undefined;
    try {
        treeView = vscode.window.createTreeView('gameModeNetwork', {
            treeDataProvider: gameProvider,
            showCollapseAll: true
        });
    } catch (error) {
        console.log('Tree view registration delayed - this is normal on first activation');
    }

    // Register commands
    const toggleMatrixCommand = vscode.commands.registerCommand('gameMode.toggleMatrix', () => {
        matrixEffect.show();
    });

    const activateGameModeCommand = vscode.commands.registerCommand('gameMode.activateGameMode', () => {
        // Change to GAME MODE theme
        vscode.workspace.getConfiguration().update('workbench.colorTheme', 'GAME MODE', vscode.ConfigurationTarget.Global);
        
        vscode.window.showInformationMessage(
            'GAME MODE ACTIVATED! Welcome to the Matrix...',
            'Show Effects'
        ).then((selection) => {
            if (selection === 'Show Effects') {
                matrixEffect.show();
            }
        });
    });

    // Update status bar periodically
    const updateInterval = setInterval(() => {
        statusBar.updateNetworkStatus(5, 5);
        gameProvider.refresh();
    }, 5000);

    // Register disposables
    const disposables = [
        statusBar,
        toggleMatrixCommand,
        activateGameModeCommand,
        { dispose: () => clearInterval(updateInterval) }
    ];
    
    if (treeView) {
        disposables.push(treeView);
    }
    
    context.subscriptions.push(...disposables);
}

export function deactivate() {
    console.log('GAME MODE Extension is now deactivated.');
}