import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  // http://localhost:3333/answers/1?u=e955a9f6-5d63-481e-9078-896c6ba875ef
  /**
   * Route Params => Paremetros que compõem as rotas
   * routes.get("/answers/:value")
   *
   * Query Params => Busca, Paginação, não são obrigatórios
   * identificados por ?
   * chave=valor
   */
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!!!");
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
