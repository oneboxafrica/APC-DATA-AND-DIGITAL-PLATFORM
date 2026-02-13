import { useParams, } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { useState } from 'react';

interface Training {
  id: number;
  theme: string;
  initiative: string;
  trainingType: string;
  trainer: string;
  state: string;
  states?: string[]; 
  startDate: string;
  endDate: string;


  description?: string;
  funding_source?: string;
  funding_year?: string;
  training_year?: string;
  approved_by?: string;
  status?: string;

  modules?: Array<{
    id: string;
    name: string;
    description?: string;
    host_user?: { name: string; role: string };
    max_participants?: number;
  }>;
  participants?: Array<{
    id: string;
    name: string;
    email: string;
    role?: string;
  }>;
}


const trainings: Training[] = [
  {
    id: 1,
    theme: 'A 5-DAY CAPACITY BUILDING WORKSHOP FOR SCHOOL SUPPORT OFFICERS',
    initiative: 'SUBEC',
    trainingType: 'School Support Training',
    trainer: 'Adéyemi College of Education Consult',
    state: 'Ondo State',
    states: ['Ondo'],
    startDate: '2023-10-30',
    endDate: '2023-11-03',
    description: 'Capacity building for School Support Officers across selected schools.',
    funding_source: 'SUBEC Fund',
    funding_year: '2023',
    training_year: '2023',
    approved_by: 'Dr. Adekunle',
    status: 'Completed',
    modules: [
      {
        id: 'm1',
        name: 'Effective School Monitoring',
        description: 'Techniques for monitoring teaching and learning outcomes.',
        host_user: { name: 'Dr. John Adebayo', role: 'Consultant' },
        max_participants: 40,
      },
      {
        id: 'm2',
        name: 'Data-Driven Support Strategies',
        description: 'Using data to support teachers and school leaders.',
        host_user: { name: 'Mrs. Fatima Yusuf', role: 'Trainer' },
        max_participants: 40,
      },
    ],
    participants: [
      { id: 'p1', name: 'Mr. Chukwuemeka Okeke', email: 'chuks@example.com', role: 'School Support Officer' },
      { id: 'p2', name: 'Ms. Aisha Mohammed', email: 'aisha@example.com', role: 'School Support Officer' },
      { id: 'p3', name: 'Mr. Ibrahim Ali', email: 'ibrahim@example.com', role: 'Administrator' },
    ],
  },
  {
    id: 2,
    theme: 'School Based Training for Improved Teacher Classroom Effectiveness and Learning Outcomes',
    initiative: 'UBEC',
    trainingType: 'Pedagogies in English, Mathematics and Science Education Training',
    trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
    state: 'Enugu State',
    startDate: '2024-01-09',
    endDate: '2024-05-12',
    modules: [],
    participants: [],
  },
  {
    id: 3,
    theme: 'Making Teachers Effective and Competent through Mentoring and Coaching',
    initiative: 'UBEC',
    trainingType: 'School Support Training',
    trainer: 'Federal College of Education Eha-Amufu Isi Uzo Local Government Enugu State',
    state: 'Enugu State',
    startDate: '2023-11-27',
    endDate: '2023-12-01',
    modules: [],
    participants: [],
  },

];

const TrainingView = () => {
  const { id } = useParams<{ id: string }>();
  const training = trainings.find(t => t.id === Number(id));


  const [currentStep, setCurrentStep] = useState(1);

  if (!training) {
    return <div className="p-6 text-center">Training not found</div>;
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const stepTitles = ['Basic Information', 'Modules', 'Participants'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Breadcrumb
        items={[
          { label: 'Trainings', href: '/training/manage' },
          { label: `View Training #${training.id}`, current: true },
        ]}
      />

      <div className="mt-6 lg:mt-6 max-w-5xl  ">
        <div className="flex items-center justify-between mb-4 lg:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Training Details</h1>
          {/* <Link to="/training/manage">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Button>
          </Link> */}
        </div>

 

  <div className="md:hidden text-start mb-4 lg:mb-6 ">
    <p className="text-lg font-medium text-[#19488A]">
      {stepTitles[currentStep - 1]}
    </p>
    <p className="text-sm text-gray-500 mt-2">
      Step {currentStep} of {stepTitles.length}
    </p>
  </div>
        {/* Step Labels (Desktop) */}
        <div className="hidden md:flex justify-start gap-16 text-sm font-medium mb-8  ">
          {stepTitles.map((title, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index + 1)}
              className={`transition-colors  ${
                currentStep === index + 1
                  ? 'text-[#19488A] font-bold'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {title}
            </button>
          ))}
        </div>



        {/* Content Card */}
        <div className="bg-white rounded-lg shadow p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-600">Theme</p>
                <p className="mt-1 text-sm  font-medium">{training.theme}</p>
              </div>

              {training.description && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Description</p>
                  <p className="mt-1 text-gray-700 text-sm ">{training.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Initiative</p>
                  <p className="mt-1 text-sm l">{training.initiative}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Training Type</p>
                  <p className="mt-1 text-sm">{training.trainingType}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Trainer/Institution</p>
                  <p className="mt-1 text-sm">{training.trainer}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">State(s)</p>
                  <p className="mt-1">
                    {Array.isArray(training.states)
                      ? training.states.join(', ')
                      : training.state}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Start Date</p>
                  <p className="mt-1 text-sm">{formatDate(training.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">End Date</p>
                  <p className="mt-1 text-sm">{formatDate(training.endDate)}</p>
                </div>
                {training.funding_year && (
                  <>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Funding Year</p>
                      <p className="mt-1 text-sm">{training.funding_year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Training Year</p>
                      <p className="mt-1 text-sm">{training.training_year}</p>
                    </div>
                  </>
                )}
                {training.status && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Status</p>
                    <p className="mt-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          training.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : training.status === 'Ongoing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {training.status}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Modules */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">
                Training Modules ({training.modules?.length || 0})
              </h2>
              {(!training.modules || training.modules.length === 0) ? (
                <div className="text-center py-12 text-gray-500">
                  No modules defined for this training.
                </div>
              ) : (
                <div className="space-y-6">
                  {training.modules.map((module: any, index: number) => (
                    <div key={module.id} className="border rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 space-y-2">
                        <h3 className="font-semibold text-md lg:text-lg">
                          Module {index + 1}: {module.name}
                        </h3>
                        {module.max_participants && (
                          <span className="text-sm text-gray-600">
                            Max: {module.max_participants} participants
                          </span>
                        )}
                      </div>
                      {module.description && (
                        <p className="text-gray-700 mb-4 text-sm ">{module.description}</p>
                      )}
                      {module.host_user && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">Instructor</p>
                          <p className="mt-1 text-sm">
                            {module.host_user.name}{' '}
                            <span className="text-xs text-gray-500">({module.host_user.role})</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Participants */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">
                Participants ({training.participants?.length || 0})
              </h2>
              {(!training.participants || training.participants.length === 0) ? (
                <div className="text-center py-12 text-gray-500">
                  No participants registered for this training.
                </div>
              ) : (
               <div className="border rounded-lg overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[600px]"> 
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left p-4 font-medium whitespace-nowrap">Name</th>
          <th className="text-left p-4 font-medium whitespace-nowrap">Email</th>
          <th className="text-left p-4 font-medium whitespace-nowrap">Role</th>
        </tr>
      </thead>
      <tbody>
        {training.participants.map((p: any) => (
          <tr key={p.id} className="border-t hover:bg-gray-50">
            <td className="p-4 font-medium text-sm whitespace-nowrap">{p.name}</td>
            <td className="p-4 text-gray-600 text-sm whitespace-nowrap">{p.email}</td>
            <td className="p-4 text-sm whitespace-nowrap">{p.role || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
              )}
            </div>
          )}
        </div>
                {/* Mobile Step Title */}
       {/* Mobile Step Navigation */}
<div className="md:hidden mb-8">


  <div className="flex justify-between items-center  py-6">
    <button
      onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
      disabled={currentStep === 1}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
        currentStep === 1
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-[#19488A] text-white hover:bg-[#163a70]'
      }`}
    >
      ← Previous
    </button>

    <button
      onClick={() => setCurrentStep(prev => Math.min(stepTitles.length, prev + 1))}
      disabled={currentStep === stepTitles.length}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
        currentStep === stepTitles.length
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-[#19488A] text-white hover:bg-[#163a70]'
      }`}
    >
      Next →
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default TrainingView;