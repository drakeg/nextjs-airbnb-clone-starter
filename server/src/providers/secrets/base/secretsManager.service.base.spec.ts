import { jest } from "@jest/globals";
import { ConfigService } from "@nestjs/config";
import { SecretsManagerServiceBase } from "./secretsManager.service.base";

describe("Testing the secrets manager base class", () => {
  const SECRET_KEY = "SECRET_KEY";
  const SECRET_VALUE = "SECRET_VALUE";
  const getMock = jest.fn();
  const configService = { get: getMock } as unknown as ConfigService;
  const secretsManagerServiceBase = new SecretsManagerServiceBase(configService);

  beforeEach(() => {
    getMock.mockClear();
  });

  it("should return value from env", async () => {
    getMock.mockReturnValue(SECRET_VALUE);
    const result = await secretsManagerServiceBase.getSecret(SECRET_KEY);
    expect(result).toBe(SECRET_VALUE);
  });

  it("should return null for unknown keys", async () => {
    getMock.mockReturnValue(undefined);
    const result = await secretsManagerServiceBase.getSecret(SECRET_KEY);
    expect(result).toBeNull();
  });

  it("should throw error if dont get key", () => {
    return expect(secretsManagerServiceBase.getSecret("")).rejects.toThrow();
  });

  it("should throw an exeption if getting null key", () => {
    return expect(
      secretsManagerServiceBase.getSecret(null as unknown as string)
    ).rejects.toThrow();
  });
});
