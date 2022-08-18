import Teams from '../database/models/Teams';

class TeamsService {
  static getAll = async () => Teams.findAll();

  static getById = async (id: string) => Teams.findByPk(id);
}

export default TeamsService;
