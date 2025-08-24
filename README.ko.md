# 프로젝트 변경 사항 설명

이 문서는 기존 JavaScript 기반의 Svelte 프로젝트를 TypeScript로 마이그레이션하고, TypeORM을 사용하여 데이터베이스 연동을 추가하는 과정에서 발생한 주요 변경 사항들을 설명합니다.

## 1. TypeScript 마이그레이션

### 의존성 추가

TypeScript 컴파일러와 관련 타입 정의를 위해 다음 라이브러리들이 `devDependencies`에 추가되었습니다.

- `typescript`: TypeScript 컴파일러
- `tslib`: TypeScript 헬퍼 라이브러리
- `@types/node`: Node.js 환경에 대한 타입 정의

### `tsconfig.json` 파일 생성

프로젝트 루트에 `tsconfig.json` 파일이 추가되었습니다. 이 파일은 TypeScript 컴파일러의 설정을 담고 있으며, SvelteKit 프로젝트에 권장되는 설정과 TypeORM 사용을 위한 `experimentalDecorators` 및 `emitDecoratorMetadata` 옵션이 포함되어 있습니다.

### `jsconfig.json` 파일 이름 변경

기존 `jsconfig.json` 파일은 `tsconfig.json`과 충돌을 일으킬 수 있으므로, `jsconfig.json.old`로 이름을 변경하여 비활성화했습니다.

### `.js` 파일을 `.ts`로 변경

- `src/lib/index.js` 파일이 `src/lib/index.ts`로 변경되었습니다. 이를 통해 Svelte 스토어에 타입이 적용되었습니다.

## 2. TypeORM 통합

### 의존성 추가

데이터베이스 연동을 위해 다음 라이브러리들이 `dependencies`에 추가되었습니다.

- `typeorm`: TypeScript 기반의 ORM(Object-Relational Mapper)
- `sqlite3`: SQLite 데이터베이스 드라이버

### 데이터베이스 설정

- `src/lib/db.ts` 파일이 새로 생성되었습니다. 이 파일은 TypeORM의 `DataSource`를 설정하고 초기화하는 역할을 합니다.
- 데이터베이스는 프로젝트 루트에 `database.sqlite` 파일로 저장되는 SQLite를 사용하도록 설정되었습니다.

### 엔티티(Entity) 생성

- `src/lib/entities/User.ts` 파일이 새로 생성되었습니다. 이 파일은 데이터베이스의 `user` 테이블과 매핑되는 `User` 클래스를 정의합니다.
- `@Entity()` 데코레이터를 사용하여 클래스가 데이터베이스 테이블과 연결됨을 나타내고, `@Column()` 데코레이터를 사용하여 클래스의 속성들이 테이블의 컬럼과 매핑됨을 나타냅니다.

## 3. `package.json` 업데이트

`typeorm`과 `sqlite3` 라이브러리는 런타임에 필요하므로, `devDependencies`에서 `dependencies`로 이동되었습니다.

## 실행 방법

프로젝트를 개발 모드로 실행하려면 다음 명령어를 사용하세요.

```bash
npm run dev
```

이 명령어는 Vite 개발 서버를 시작하고, 데이터베이스 연결을 초기화합니다.
