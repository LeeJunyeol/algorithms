package bruteforce;

import java.util.Arrays;
import java.util.Scanner;

public class BoardCover {
	static int c;
	// #: 검은 칸, .: 흰 칸
	// 1<= h, w <=20
	// 흰칸을 3칸짜리 L자 모양의 블록으로 덮기

	static int h, w;

	// 주어진 칸을 덮을 수 있는 네 가지 방법
	// 블록을 구성하는 세 칸의 상대적 위치 (dy, dx)의 목록
	static int[][][] coverType = { 
			{ { 0, 0 }, { 1, 0 }, { 1, -1 } }, 
			{ { 0, 0 }, { 1, 0 }, { 1, 1 } },
			{ { 0, 0 }, { 0, 1 }, { 1, 0 } }, 
			{ { 0, 0 }, { 0, 1 }, { 1, 1 } } 
	};

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		c = Integer.parseInt(sc.nextLine().trim());

		for (int i = 0; i < c; ++i) {
			h = sc.nextInt();
			w = sc.nextInt();
			sc.nextLine();

			int[][] board = new int[h][w];

			for (int j = 0; j < h; ++j) {
				board[j] = Arrays.stream(sc.nextLine().trim().split("")).mapToInt(v -> {
					return v.equals("#") ? 1 : 0;
				}).toArray();
			}
			
			int n = h*w - Arrays.stream(board).flatMapToInt(x -> Arrays.stream(x)).sum();
			
			if(n % 3 == 0) {
				System.out.println(cover(board));
			} else {
				System.out.println(0);
			}
			
		}
		sc.close();
	}

	// board의 (y, x)를 type번 방법으로 덮거나, 덮었던 블록을 없앤다.
	// delta = 1이면 덮고, -1이면 덮었던 블록을 없앤다.
	// 만약 블록이 제대로 덮이지 않은 경우 (게임판 밖으로 나가거나, 겹치거나, 검은 칸을 덮을 때) false를 반환한다.	
	static boolean set(int[][] board, int y, int x, int type, int delta) {
		boolean ok = true;
		for (int i = 0; i < 3; ++i) {
			int dy = y + coverType[type][i][0];
			int dx = x + coverType[type][i][1];

			if (dy < 0 || dy >= board.length || dx < 0 || dx >= board[0].length) {
				ok = false;
			} else if ((board[dy][dx] += delta) > 1) {
				ok = false;
			}
		}
		return ok;
	}

	// board의 모든 빈 칸을 덮을 수 있는 방법의 수를 반환한다.
	// board[i][j] = 1 이미 덮인 칸 혹은 검은 칸
	// board[i][j] = 0 아직 덮이지 않은 칸
	static int cover(int[][] board) {
		// 아직 채우지 못한 칸 중 가장 윗줄 왼쪽에 있는 칸을 찾는다.
		int y = -1, x = -1;
		
		for (int i = 0; i < board.length; ++i) {
			for (int j = 0; j < board[i].length; ++j) {
				if (board[i][j] == 0) {
					y = i;
					x = j;
					break;
				}
			}
			if (y != -1) {
				break;
			}
		}
		// 기저사례(base case): 모든 칸을 채웠으면 1을 반환한다.
		if(y == -1) {
			return 1;
		}
		int ret = 0;
		
		for(int type = 0; type < 4; ++type) {
			// 만약 board[y][x]를 type 형태로 덮을 수 있으면 재귀 호출한다.
			if(set(board, y, x, type, 1)) {
				ret += cover(board);
			}
			// 덮었던 블록을 치운다.
			set(board, y, x, type, -1);
		}
		return ret;
	}
}
