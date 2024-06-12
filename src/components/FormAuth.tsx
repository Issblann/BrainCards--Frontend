import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';

const formAuth = () => {
  return (
    <div className="bg-primary w-full flex justify-center p-5 h-full">
      <div className="border border-[#878787]  p-4 rounded-[10px]">
        <Card color="transparent" shadow={false}>
          <Typography className="text-black font-light">Welcome !</Typography>
          <Typography className="text-black" variant="h4">
            Sign In for
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Create your favorites decks
          </Typography>

          <div className="w-full flex justify-center mt-5">
            <Button className="rounded-md shadow-sm">
              Logging in with Google
            </Button>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <span className="w-1/5 bg-[#D9D9D9] block h-[1px] mt-3"></span>
            <span className="text-black text-sm">or</span>
            <span className="w-1/5 bg-[#D9D9D9] block h-[1px] mt-3"></span>
          </div>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  Remember me
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
            />
            <Button className="mt-6" fullWidth>
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <a href="#" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default formAuth;
