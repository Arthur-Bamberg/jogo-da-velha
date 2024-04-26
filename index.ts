type Tabuleiro = ('' | 'x' | 'o')[][];

/**
 * Função principal que recebe o tabuleiro de jogo e retorna a posição da jogada
 * @param tabuleiro tabuleiro de jogo na velha nXn
 * @returns posição da jogada
 */
const jogar = (tabuleiro: Tabuleiro) => {
    const tamanhoTabuleiro = tabuleiro.length;
    let quantosX = 0;
    let quantosO = 0;

    tabuleiro.forEach(linha => {
        linha.forEach(celula => {
            if (celula === 'x') quantosX++;
            else if (celula === 'o') quantosO++;
        });
    });

    const meuMarcador = quantosX > quantosO ? 'o' : 'x';
    const marcadorOponente = meuMarcador === 'x' ? 'o' : 'x';

    // Verifica se o jogador pode vencer na próxima jogada, para vencer
    let jogada = encontrarMelhorJogada(tabuleiro, meuMarcador, tamanhoTabuleiro);
    if (jogada) return jogada;

    // Verifica se o oponente pode vencer na próxima jogada, para bloquear
    jogada = encontrarMelhorJogada(tabuleiro, marcadorOponente, tamanhoTabuleiro);
    if (jogada) return jogada;

    // Verifica se o centro está vazio, para jogar
    const centro = Math.floor(tamanhoTabuleiro / 2);
    if (tabuleiro[centro][centro] === '') {
        return [centro, centro];
    }

    // Verifica se as quinas estão vazias, para jogar
    for (let i = 0; i < tamanhoTabuleiro; i++) {
        for (let j = 0; j < tamanhoTabuleiro; j++) {
            if (tabuleiro[i][j] === '') {
                return [i, j];
            }
        }
    }
}

/**
 * Função que encontra a melhor jogada para o jogador
 * @param tabuleiro tabuleiro do jogo
 * @param marcador marcador do jogador
 * @param tamanhoTabuleiro tamanho do tabuleiro (n do jogo da velha nXn)
 * @returns posição da jogada para vencer
 */
const encontrarMelhorJogada = (tabuleiro: Tabuleiro, marcador: 'x' | 'o', tamanhoTabuleiro: number): [number, number] | null => {
    let jogada: [number, number] | null = null;
    tabuleiro.forEach((linha, i) => {
        linha.forEach((celula, j) => {
            if (celula === '') {
                tabuleiro[i][j] = marcador;
                if (verificaVencedor(tabuleiro, marcador, tamanhoTabuleiro)) {
                    jogada = [i, j];
                }
                tabuleiro[i][j] = '';
            }
        });
    });
    return jogada;
}


/**
 * Função que verifica se o jogador venceu
 * @param tabuleiro tabuleiro do jogo
 * @param marcador marcador do jogador
 * @returns se o jogador venceu
 */
const verificaVencedor = (tabuleiro: Tabuleiro, marcador: 'x' | 'o', n: number): boolean => {
    let venceu = false;

    tabuleiro.forEach((linha, idx) => {
        if (linha.every(celula => celula === marcador) || tabuleiro.every(row => row[idx] === marcador)) {
            venceu = true;
        }
    });

    if (tabuleiro.every((linha, idx) => linha[idx] === marcador) || tabuleiro.every((linha, idx) => linha[n - 1 - idx] === marcador)) {
        venceu = true;
    }

    return venceu;
}
