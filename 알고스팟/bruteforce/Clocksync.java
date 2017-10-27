package bruteforce;

import java.util.Arrays;
import java.util.Scanner;

public class Clocksync {
	final static int INF = 9999, SWITCHES = 10, CLOCKS = 16;
	// linked[i][j] = 'x': i�� ����ġ�� j�� �ð谡 ����Ǿ� �ִ�.
	// linked[i][j] = '.': i�� ����ġ�� j�� �ð谡 ����Ǿ� ���� �ʴ�.
	static final String[] linked = {
			"xxx.............",
			"...x...x.x.x....",
			"....x.....x...xx",
			"x...xxxx........",
			"......xxx.x.x...",
			"x.x...........xx",
			"...x..........xx",
			"....xx.x......xx",
			".xxxxx..........",
			"...xxx...x...x.."
	};
	
	static int c; // Test Case
	static int[] clocks;
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		c = Integer.parseInt(sc.nextLine().trim());
		
		for(int i = 0; i < c; ++i) {
			clocks = Arrays.stream(sc.nextLine().trim().split(" ")).mapToInt(Integer::parseInt).toArray();
			
			int result = solve(clocks, 0);
			if(result >= INF) {
				result = -1;
			}
			System.out.println(result);
		}
	}
	
	// ��� �ð谡 12�ø� ����Ű�� �ִ��� Ȯ���Ѵ�.
	static boolean areAligned(int[] clocks) {
		return Arrays.stream(clocks).allMatch(v -> v==12);
	}
	
	// swtch�� ����ġ�� ������.
	static void push(int[] clocks, int swtch) {
		for(int clock = 0; clock < CLOCKS; ++clock) {
			if(linked[swtch].charAt(clock) == 'x') {
				clocks[clock] += 3;
				if(clocks[clock] == 15) {
					clocks[clock] = 3;
				}
			}
		}
	}
	
	// clocks: ���� �ð���� ����
	// swtch: �̹��� ���� ��ġ
	// �� ��ȣ�� �־��� ��, ���� ����ġ���� ������ clocks�� 12�÷� ���� �� �ִ� �ּ� Ƚ���� ��ȯ�Ѵ�.
	// ���� �Ұ����ϴٸ� INF �̻��� ū ���� ��ȯ�Ѵ�.
	static int solve(int[] clocks, int swtch) {
		if(swtch == SWITCHES) {
			return areAligned(clocks) ? 0 : INF;
		}
		// �� ����ġ�� 0�� ������ ������ �� �� ������ �������� ��� �õ��Ѵ�.
		int ret = INF;
		for(int cnt = 0; cnt < 4; ++cnt) {
			ret = Math.min(ret,  cnt + solve(clocks, swtch + 1));
			push(clocks, swtch);
		}
		// push(clocks, swtch)�� �� �� ȣ��Ǿ����� clocks�� ������ ���� ���°� �ȴ�.
		return ret;
	}
	
}


//3
//12 6 6 6 6 6 12 12 12 12 12 12 12 12 12 12 
//12 9 3 12 6 6 9 3 12 9 12 9 12 12 6 6
//6 12 6 12 6 12 6 12 6 12 12 12 12 12 12 12 
