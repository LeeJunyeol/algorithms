package bruteforce;

import java.util.Arrays;
import java.util.Scanner;

public class BoardCover {
	static int c;
	// #: ���� ĭ, .: �� ĭ
	// 1<= h, w <=20
	// ��ĭ�� 3ĭ¥�� L�� ����� ������� ����

	static int h, w;

	// �־��� ĭ�� ���� �� �ִ� �� ���� ���
	// ����� �����ϴ� �� ĭ�� ����� ��ġ (dy, dx)�� ���
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

	// board�� (y, x)�� type�� ������� ���ų�, ������ ����� ���ش�.
	// delta = 1�̸� ����, -1�̸� ������ ����� ���ش�.
	// ���� ����� ����� ������ ���� ��� (������ ������ �����ų�, ��ġ�ų�, ���� ĭ�� ���� ��) false�� ��ȯ�Ѵ�.	
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

	// board�� ��� �� ĭ�� ���� �� �ִ� ����� ���� ��ȯ�Ѵ�.
	// board[i][j] = 1 �̹� ���� ĭ Ȥ�� ���� ĭ
	// board[i][j] = 0 ���� ������ ���� ĭ
	static int cover(int[][] board) {
		// ���� ä���� ���� ĭ �� ���� ���� ���ʿ� �ִ� ĭ�� ã�´�.
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
		// �������(base case): ��� ĭ�� ä������ 1�� ��ȯ�Ѵ�.
		if(y == -1) {
			return 1;
		}
		int ret = 0;
		
		for(int type = 0; type < 4; ++type) {
			// ���� board[y][x]�� type ���·� ���� �� ������ ��� ȣ���Ѵ�.
			if(set(board, y, x, type, 1)) {
				ret += cover(board);
			}
			// ������ ����� ġ���.
			set(board, y, x, type, -1);
		}
		return ret;
	}
}
